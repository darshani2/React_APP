function Validation(values){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const phone_pattern = /^\d{10}$/

    if(values.name === ""){
        error.name = "Name should not be empty"
    }
    else{
        error.name = ""
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

    if(values.email === ""){
        error.email = "Email should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email didn't match"
    }
    else{
        error.email = ""
    }

    if(values.password === ""){
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password = "Password didn't match (ex: ABcd1234)"
    }
    else{
        error.password = ""
    }

    return error;
}

export default Validation;
