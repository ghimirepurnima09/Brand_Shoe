import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// ================= REGISTER =================

export const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const userExists = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
        if (userExists.rows.length > 0)
            return res.status(400).json({ success: false, message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            `INSERT INTO users(name, email, password, phone) VALUES($1, $2, $3, $4)`,
            [name, email, hashedPassword, phone]
        );

        res.status(201).json({ success: true, message: "Registration Successful" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= LOGIN =================

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
        if (user.rows.length === 0)
            return res.status(400).json({ success: false, message: "User Not Found" });

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword)
            return res.status(400).json({ success: false, message: "Invalid Password" });

        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({
            success: true,
            token,
            user: {
                id:    user.rows[0].id,
                name:  user.rows[0].name,
                email: user.rows[0].email,
                phone: user.rows[0].phone,
            },
            message: "Login Successful",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= SEND OTP =================

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
        if (user.rows.length === 0)
            return res.status(400).json({ success: false, message: "User Not Found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await pool.query("UPDATE users SET otp=$1 WHERE email=$2", [otp, email]);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from:    process.env.EMAIL_USER,
            to:      email,
            subject: "Brand_Shoe OTP",
            text:    `Your OTP is ${otp}`,
        });

        res.status(200).json({ success: true, message: "OTP Sent Successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= RESET PASSWORD =================

export const resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
        if (user.rows.length === 0)
            return res.status(400).json({ success: false, message: "User Not Found" });

        if (user.rows[0].otp != otp)
            return res.status(400).json({ success: false, message: "Invalid OTP" });

        const samePassword = await bcrypt.compare(password, user.rows[0].password);
        if (samePassword)
            return res.status(400).json({ success: false, message: "New password cannot be old password" });

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            `UPDATE users SET password=$1, otp=NULL WHERE email=$2`,
            [hashedPassword, email]
        );

        res.status(200).json({ success: true, message: "Password Reset Successful" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};