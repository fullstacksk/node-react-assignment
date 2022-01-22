import validator from 'validator';
;

export default (data) => {
    const { name, email, age, mobile, password, confirmPassword,avatar } = data;
    let errors = { name: "", email: "", age: "", mobile: "", password: "", confirmPassword: "",avatar:"" };
    let isError = false;
    if (!name)
        errors.name = "Name is required";
    if (!validator.isEmail(email))
        errors.email = "Invalid email";
    if (!age)
        errors.age = "Age is required";
    if (!mobile)
        errors.mobile = "Mobile is required";
    if (!!mobile && !validator.isMobilePhone(mobile, ['en-IN']))
        errors.mobile="Invalid mobile number"
    if (password.length < 8)
        errors.password = "Minimum 8 chars";
    if (password !== confirmPassword)
        errors.confirmPassword = "Password mismatch";
    if (!avatar)
        errors.avatar = "Avatar is required";
    isError = !!errors.name || !!errors.email || !!errors.age || !!errors.mobile ||  !!errors.password || !!errors.confirmPassword || !!errors.avatar;
    return {isError, errors};
}