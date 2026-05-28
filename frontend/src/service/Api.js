import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/auth"
});


// ================= REGISTER =================

export const RegisterUser = (data) =>
    API.post("/register", data);


// ================= LOGIN =================

export const LoginUser = (data) =>
    API.post("/login", data);


// ================= SEND OTP =================

export const SendOTP = (data) =>
    API.post("/forgot-password", data);


// ================= RESET PASSWORD =================

export const ResetPasswordAPI = (data) =>
    API.post("/reset-password", data);