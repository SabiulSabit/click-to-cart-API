const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require('uuid');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlenght: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hashPassword: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);


//virtual field
userSchema.virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = uuidv1.v1();
    this.hashPassword = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })


//add Methods
userSchema.methods = {

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashPassword;
  },

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    } catch (err) {
      return '';
    }
  }
}

module.exports = mongoose.model('User', userSchema);