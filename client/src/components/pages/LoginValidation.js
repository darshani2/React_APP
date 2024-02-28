function Validation(values){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const phone_pattern = /^\d{10}$/

    if(values.email === ""){
        error.email = "Email should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email format is incorrect"
    }
    else{
        error.email = ""
    }

    if(values.password === ""){
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password = "Password format is incorrect"
    }
    else{
        error.password = ""
    }

    if(values.phone_num === ""){
        error.phone_num = "Phone number should not be empty"
    }
    else if (!phone_pattern.test(values.phone_num)){
        error.phone_num = "Invalid phone number format"
    }
    else{
        error.phone_num = ""
    }

    return error;
}

export default Validation;
