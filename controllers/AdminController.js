import { convertPasswordToHash } from "../middlewar/passwordHashing.js";
import adminModel from "../models/AdminModel.js";

const createNewSubAdmin = async (req, res) => {
    try {
        const { password, ...values } = req.body;
        const conversionOfPassword = await convertPasswordToHash(password);
        const mergeObject = { password: conversionOfPassword, ...values };
        const newRegistration = await adminModel.create(mergeObject);
        res.status(200).send({ message: "New Admin created" })
    } catch (error) {
        switch (true) {
            case error.errorResponse && error.errorResponse.keyPattern.email == 1:
                res.status(409).send({ message: "Email ID already exist" });
                break;
            default:
                res.status(400).send({ message: "Something went wrong" })
        }
    }
}

export {createNewSubAdmin}