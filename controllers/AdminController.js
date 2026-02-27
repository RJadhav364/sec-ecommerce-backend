import { compareHashPassword, convertPasswordToHash } from "../middlewar/passwordHashing.js";
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

const adminLogin = async (req, res) => {
    try {
        const findAdminCredentials = await adminModel.findOne({ email: req.body.email });
        switch (true) {
            case !findAdminCredentials:
                res.status(404).json({ message: "Email not found" });
            default:
                const passwordResult = await compareHashPassword(req.body.password, findAdminCredentials.password)
                switch (true) {
                    case passwordResult:
                        const payload = {
                            id: findAdminCredentials._id,
                            email: findAdminCredentials.email,
                            username: findAdminCredentials.username,
                            role: findAdminCredentials.role
                        };
                        res.status(200).send({
                            message: "Login Successful", data: {
                                token: await findAdminCredentials.generateToken(payload),
                                ...payload
                            }
                        })
                        break;
                    default:
                        res.status(401).send({ message: "Password mismatch" });
                }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export { createNewSubAdmin, adminLogin }