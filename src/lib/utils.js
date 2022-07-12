export const checkEmail = (email) => {
    const pattern = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")
    return pattern.test(email)
}

export const loginChecks = (email, pwd) => {
    let res = undefined
    
    if (!checkEmail(email)) {
        res = {
          content: "The email is not formatted correctly.",
          title: "Invalid email",
          alertType: "alert-primary",
        }
    }
    else if (pwd?.length < 8) {
        res = {
          content: "The password must be at least 8 characters long.",
          title: "Password too short",
          alertType: "alert-secondary",
        }
    }

    return res
}

export const registerChecks = (email, pwd, pwd2) => {
    let res = undefined

    if (!checkEmail(email)) {
        res = {
          content: "The email is not formatted correctly.",
          title: "Invalid email",
          alertType: "alert-primary",
        }
    }
    else if (pwd?.toLowerCase() !== pwd2?.toLowerCase()) {
        res = {
          content: "The passwords provided do not match.",
          title: "Passwords do not match",
          alertType: "alert-secondary",
        }
    }
    else if (pwd?.length < 8 || pwd2?.length < 8) {
        res = {
          content: "The password must be at least 8 characters long.",
          title: "Password too weak",
          alertType: "alert-secondary",
        }
    }

    return res
}

export const fbLoginChecks = (e) => {
    let res = undefined

    if (e.toString().indexOf("wrong-password") > 0) {
        res = {
          content: "The password is incorrect. Please try the correct one.",
          title: "Incorrect password",
          alertType: "alert-secondary",
        }
    }
    else if (e.toString().indexOf("user-not-found") > 0) {
        res = {
          content: "This user does not exist. Please use a different user or sign up.",
          title: "User does not exist",
          alertType: "alert-secondary",
        }
    }
    else {
        res = {
          content: "Internal database error. Please try again later.",
          title: "Internal error",
          alertType: "alert-danger",
        }
    }

    return res
}

export const fbRegisterChecks = (e) => {
    let res = undefined

    console.log(e.toString())
    if (e.toString().indexOf("in-use") > 0) {
        res = {
          content: "This user does not exist. Please try with a different email.",
          title: "User does not exist",
          alertType: "alert-secondary",
        }
    }
    else {
        res = {
          content: "Internal database error. Please try again later.",
          title: "Internal error",
          alertType: "alert-danger",
        }
    }

    return res
}