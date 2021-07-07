const crypto = require("crypto")
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "please give a username"]
    },
    email: {
        type: String,
        require: [true, "provide Email"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "please provide password"],
        minlength: 6,
        select: false
    },
    resetpasswordToken: String,
    restpasswordExpire: Date

});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {

        next();

    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
};
UserSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_Secret, { expiresIn: process.env.JWT_Expire }
    )
}
UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");


    this.resetPasswordToken = Crypto.createHash("sha56").update(resetToken).digest('hex');
    this.restpasswordExpire = Date.now() + 10 * (60 * 1000)
    return resetToken;
}


const User = mongoose.model("User", UserSchema);

module.exports = User;