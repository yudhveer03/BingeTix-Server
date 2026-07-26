import express from "express"
import userModel from "../model/user"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt.js"
import validator from "../middlewares/express-validator"

export const  register = async (req, res) => {

    try {
        const { username, password, email } = req.body
        const hashPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            password: hashPassword,
            email
        })

        const token = jwt.sign({ id: user._id, },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            message: "User Registered Successfully",
            token
        })
    } catch (error) {
        // EXACT FIX: Catch database errors (like duplicate emails) and return a proper response
        console.error("Registration Error:", error);
        return res.status(500).json({
            message: "Registration failed. Email might already exist.",
            error: error.message
        });
    }
}

export const login = async (req, res) => {
    // EXACT FIX: Added try...catch block to login as well
    try {
        const { username, password } = req.body
        const user = await userModel.findOne({
            username: username
        })

        if (!user) {
            return res.status(401).json({
                message: "User not registered"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        const token = jwt.sign({ id: user._id, },
            process.env.JWT_SECRET_KEY, {
            expiresIn: '7d'
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "Login Successfull",
            token
        })
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal server error during login" });
    }
}

export const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    })
    res.send("Logout Successfull")
}

export const getMe = async (req, res) => {
    try {
        // req.user.id comes from your jwtMiddleware
        const user = await userModel.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.error("Get Me Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


