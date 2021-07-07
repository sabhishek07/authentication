const User = require('../models/auth')
const ErrorResponse = require("../utils/errorResponse")

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username, email, password

        });
        sendToken(user, 201, res);

    }
    catch (error) {
        next(error);
    }



};
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse("please provide an email and password", 400))
    }
    try {
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return next(new ErrorResponse("invalid credential", 404))
        }
        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return next(new ErrorResponse("invalid credential", 400))
        }
        sendToken(user, 200, res);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error" })

    }


};

exports.forgotpassword = (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorResponse("email could not be sent", 404))
        }
        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `http://localhost:8000/passwordreset/${resetToken}`;
        const message = `
        <h1>You hve requested a passsword reset</h1>
        <p>Please go to this link to reet your password</p>
        <a href =${resetUrl} clicktracking*off>${resetUrl}</a>`

        try {

        }
        catch {

        }

    }

    catch (error) {

    }
}
const sendToken = (user, status, res) => {
    const token = user.getSignedToken()
    res.status(200).json({
        success: true, token
    })
}