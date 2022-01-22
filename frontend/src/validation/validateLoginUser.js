import validator from 'validator';
;

export default (data) => {
    const { email, password } = data;
    let errors = { email: "", password: ""};
    let isError = false;
    if (!validator.isEmail(email))
        errors.email = "Invalid email";
    if (password.length < 8)
        errors.password = "Minimum 8 chars";
    isError = !!errors.password || !!errors.email ;
    return {isError, errors};
}