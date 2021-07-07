exports.getPrivateData = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: "you get access to this protected route"
    })
}