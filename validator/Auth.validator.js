const { body, validationResult } = require('express-validator')

const userSignupValidationRules = [
    body("first_name", "Please Enter a Valid First Name")
        .not()
        .isEmpty()
        .withMessage("First Name is Required")
        .isAlpha()
        .withMessage("First Name must be Alphabets"),
    body("last_name", "Please Enter a Valid Last Name")
        .not()
        .isEmpty()
        .isAlpha(),
    body("username", "Please Enter a Valid Username")
        .not()
        .isEmpty()
        .isLowercase(),
    body("email", "Please enter a valid email").normalizeEmail().isEmail(),
    body("password", {
        msg: 'Please enter a valid Password',
        constraints: [
            'Minimum Length: 8 Characters',
            'Must contain 1 Uppercase Alphabet',
            'Must contain 1 Lowercase Alphabet',
            'Must contain 1 Number',
            'Must contain 1 Special Character',
        ]
    }).matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    ),
    body("confirm_password", {
        msg: 'Please enter a valid Password',
        constraints: [
            'Minimum Length: 8 Characters',
            'Must contain 1 Uppercase Alphabet',
            'Must contain 1 Lowercase Alphabet',
            'Must contain 1 Number',
            'Must contain 1 Special Character',
        ]
    }).matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    )
]

const userLoginValidationRules = [
    body("username", "Please Enter a Valid Username")
        .not()
        .isEmpty()
        .isLowercase(),
    body("password", {
        msg: 'Please enter a valid Password',
        constraints: [
            'Minimum Length: 8 Characters',
            'Must contain 1 Uppercase Alphabet',
            'Must contain 1 Lowercase Alphabet',
            'Must contain 1 Number',
            'Must contain 1 Special Character',
        ]
    }).matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    )
]

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    userSignupValidationRules,
    userLoginValidationRules,
    validate,
}