var mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

  var userSchema = new mongoose.Schema({
    name: {
        type: String, //name type is in string
        required: true, //it should be mandatory when this filed should display otherwise it is going to be error.
        maxlength: 32, //maximum length 
        trim: true //it will avoid extra spaces    
    },
    lastname: {
        type: String,
        maxlength: 40,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String, //salt will be used for password
    role: {
        type: Number,
        default: 0
    },
    purchaces: {
        type: Array,
        default: []
    }
  },
  { timestamps: true }
  );

  
  userSchema
    .virtual("password")
    .set(function (password) {
      this._password = password
      this.salt = uuidv1();
      this.encry_password = this.securePassword(password);
  })
    .get(function () {
      return this._password;
  })
  
  userSchema.methods = {


    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },

      securePassword: function(plainpassword) {
          if (!plainpassword) return "";
          try {
              return crypto.createHmac('sha256', this.salt)
              .update(plainpassword)
              .digest('hex');
          } catch (err) {
              return "";
          }
      }
  }

  module.exports = mongoose.model("User", userSchema);

