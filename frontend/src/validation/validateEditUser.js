import validator from 'validator';
;

export default (data) => {
    const { name, email, age, mobile, password, confirmPassword } = data;
    let errors = { name: "",  age: "", mobile: "" };
    let isError = false;
    if (!name)
        errors.name = "Name is required";
    if (!age)
        errors.age = "Age is required";
    if (!mobile)
        errors.mobile = "Mobile is required";
    if (!!mobile && !validator.isMobilePhone(mobile, ['en-IN']))
        errors.mobile="Invalid mobile number"
    isError = !!errors.name || !!errors.email || !!errors.age || !!errors.mobile ||  !!errors.password || !!errors.confirmPassword;
    return {isError, errors};
}