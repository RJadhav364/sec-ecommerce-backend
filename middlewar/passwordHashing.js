import bcrypt from "bcrypt"
const convertPasswordToHash = async(password) => {
    let bcryptPassword = await bcrypt.hash(password , 10);
    // console.log("bcryptPassword",bcryptPassword);
    return bcryptPassword;
}

const compareHashPassword = async(passwordGotFromuser , passwordInDB) => {
    const comparedpasswordResult = await bcrypt.compare(passwordGotFromuser, passwordInDB);
    // console.log(comparedpasswordResult, "comparedpasswordResult");
    return comparedpasswordResult;
}

export {convertPasswordToHash , compareHashPassword}