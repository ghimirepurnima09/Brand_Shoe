import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ success: false, message: "Please fill all fields" });

        const admin = await pool.query("SELECT * FROM admins WHERE email=$1", [email]);
        if (admin.rows.length === 0)
            return res.status(400).json({ success: false, message: "Admin Not Found" });

        const validPassword = await bcrypt.compare(password, admin.rows[0].password);
        if (!validPassword)
            return res.status(400).json({ success: false, message: "Invalid Password" });

        const token = jwt.sign(
            { id: admin.rows[0].id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true, token,
            admin: { id: admin.rows[0].id, name: admin.rows[0].name, email: admin.rows[0].email },
            message: "Admin Login Successful"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getDashboardStats = async (req, res) => {
    try {
        const totalProducts = await pool.query("SELECT COUNT(*) FROM products");
        const totalUsers = await pool.query("SELECT COUNT(*) FROM users");
        const menProducts = await pool.query("SELECT COUNT(*) FROM products WHERE gender='Men'");
        const womenProducts = await pool.query("SELECT COUNT(*) FROM products WHERE gender='Women'");
        const kidsProducts = await pool.query("SELECT COUNT(*) FROM products WHERE gender='Kids'");
        const recentProducts = await pool.query("SELECT * FROM products ORDER BY id DESC LIMIT 5");
        // ✅ removed phone
        const recentUsers = await pool.query("SELECT id, name, email FROM users ORDER BY id DESC LIMIT 5");

        res.status(200).json({
            success: true,
            stats: {
                totalProducts: parseInt(totalProducts.rows[0].count),
                totalUsers: parseInt(totalUsers.rows[0].count),
                menProducts: parseInt(menProducts.rows[0].count),
                womenProducts: parseInt(womenProducts.rows[0].count),
                kidsProducts: parseInt(kidsProducts.rows[0].count),
            },
            recentProducts: recentProducts.rows,
            recentUsers: recentUsers.rows,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        // ✅ removed phone
        const users = await pool.query("SELECT id, name, email FROM users ORDER BY id DESC");
        res.status(200).json({ success: true, users: users.rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
        if (user.rows.length === 0)
            return res.status(404).json({ success: false, message: "User Not Found" });
        await pool.query("DELETE FROM users WHERE id=$1", [id]);
        res.status(200).json({ success: true, message: "User Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const adminGetProducts = async (req, res) => {
    try {
        const products = await pool.query("SELECT * FROM products ORDER BY id DESC");
        res.status(200).json({ success: true, products: products.rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const adminAddProduct = async (req, res) => {
    try {
        const { name, category, gender, price, quantity, description, image } = req.body;
        if (!name || !category || !gender || !price || !quantity || !description || !image)
            return res.status(400).json({ success: false, message: "Please fill all fields" });

        const newProduct = await pool.query(
            `INSERT INTO products (name, category, gender, price, quantity, description, image)
             VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
            [name, category, gender, price, quantity, description, image]
        );
        res.status(201).json({ success: true, message: "Product Added Successfully", product: newProduct.rows[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const adminUpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, gender, price, quantity, description, image } = req.body;
        const product = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
        if (product.rows.length === 0)
            return res.status(404).json({ success: false, message: "Product Not Found" });

        const updatedProduct = await pool.query(
            `UPDATE products SET name=$1, category=$2, gender=$3, price=$4, quantity=$5, description=$6, image=$7
             WHERE id=$8 RETURNING *`,
            [name, category, gender, price, quantity, description, image || product.rows[0].image, id]
        );
        res.status(200).json({ success: true, message: "Product Updated Successfully", product: updatedProduct.rows[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const adminDeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
        if (product.rows.length === 0)
            return res.status(404).json({ success: false, message: "Product Not Found" });
        await pool.query("DELETE FROM products WHERE id=$1", [id]);
        res.status(200).json({ success: true, message: "Product Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};