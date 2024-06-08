import User from '../models/user-model.js'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import { OAuth2Client } from 'google-auth-library'

dotenv.config()

export const register = async (req, res) => {

    const { username, email, password } = req.body;
    console.log(res.body)
    let userExist;
    try {
        userExist = await User.findOne({ email: email });
    } catch {
        return res.status(404).json({ message: "Internal server error" });
    }

    if (userExist) {
        return res.status(404).json({ message: "User already exists, try login!!!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        google: false,
        verified: false
    })

    try {
        await newUser.save()
        return res.status(200).json({ message: "User saved successfully", newUser })
    } catch {
        return res.status(500).json({ message: "Internal server Error" })
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body

    let userExist;

    try {
        userExist = await User.findOne({ email });
    } catch {
        return res.status(500).json({ message: "Internal server Error" })
    }

    if (!userExist) {
        return res.status(500).json({ message: "Invalid Credentials" })
    }

    if (userExist.google) {
        return res.status(500).json({ message: "Invalid Credentials" })
    }

    const validPass = await bcrypt.compare(password, userExist.password)

    console.log(validPass)
    if (!validPass) {
        return res.status(500).json({ message: "Invalid credentials" })
    }

    const token = JWT.sign({ userId: userExist._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    userExist.password = ""

    return res.status(200).json({ user: userExist, token, expiresIn: Date.now() + (24 * 60 * 60 * 1000) })


}





export const googleAuth = async (req, res) => {
    const token = req.body.credential
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.CLIENT_URL)

    let userData
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        console.log(ticket)
        const payload = ticket.getPayload()
        console.log(payload)



        if (payload.iss !== 'https://accounts.google.com' || payload.aud !== process.env.GOOGLE_CLIENT_ID) {
            throw new Error('Invalid Google ID token');
        }

        userData = payload

    } catch (err) {
        return res.status(500).json({ message: "Error verifying google ID", error: err.message });
    }
    if (!userData) {
        return res.status(500).json({ message: "Something Went Wrong!!!" })
    }
    const { name, email } = userData;
    try {

        const user = await User.findOne({ email: email, password: process.env.GOOGLE_USER_PASSWORD, google: true });
        if (user) {
            const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
            return res.status(200).json({ user, token, expiresIn: Date.now() + (24 * 60 * 60 * 1000) })
        }

        const newUser = new User({
            username: name,
            email: email,
            password: process.env.GOOGLE_USER_PASSWORD,
            google: true,
            verified: true,
        })

        await newUser.save()

        const token = JWT.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        newUser.password = ""

        return res.json({ user: newUser, token, expiresIn: Date.now() + (24 * 60 * 60 * 1000) })



    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" }, err)
    }
}