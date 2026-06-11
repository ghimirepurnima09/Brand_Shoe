import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= ADMIN LOGIN =================
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
            success: true,
            token,
            admin: { id: admin.rows[0].id, name: admin.rows[0].name, email: admin.rows[0].email },
            message: "Admin Login Successful",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= DASHBOARD STATS =================
export const getDashboardStats = async (req, res) => {
    try {
        const totalProducts  = await pool.query("SELECT COUNT(*) FROM products");
        const totalUsers     = await pool.query("SELECT COUNT(*) FROM users");
        const totalOrders    = await pool.query("SELECT COUNT(*) FROM orders");
        const totalRevenue   = await pool.query("SELECT COALESCE(SUM(total_price),0) as revenue FROM orders WHERE status != 'cancelled'");
        const menProducts    = await pool.query("SELECT COUNT(*) FROM products WHERE gender='Men'");
        const womenProducts  = await pool.query("SELECT COUNT(*) FROM products WHERE gender='Women'");
        const kidsProducts   = await pool.query("SELECT COUNT(*) FROM products WHERE gender='Kids'");
        const recentProducts = await pool.query("SELECT * FROM products ORDER BY id DESC LIMIT 5");
        const recentUsers    = await pool.query("SELECT id, name, email FROM users ORDER BY id DESC LIMIT 5");
        const recentOrders   = await pool.query("SELECT * FROM orders ORDER BY created_at DESC LIMIT 5");

        res.status(200).json({
            success: true,
            stats: {
                totalProducts:  parseInt(totalProducts.rows[0].count),
                totalUsers:     parseInt(totalUsers.rows[0].count),
                totalOrders:    parseInt(totalOrders.rows[0].count),
                totalRevenue:   parseFloat(totalRevenue.rows[0].revenue),
                menProducts:    parseInt(menProducts.rows[0].count),
                womenProducts:  parseInt(womenProducts.rows[0].count),
                kidsProducts:   parseInt(kidsProducts.rows[0].count),
            },
            recentProducts: recentProducts.rows,
            recentUsers:    recentUsers.rows,
            recentOrders:   recentOrders.rows,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= GET ALL USERS =================
export const getAllUsers = async (req, res) => {
    try {
        const users = await pool.query("SELECT id, name, email FROM users ORDER BY id DESC");
        res.status(200).json({ success: true, users: users.rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= DELETE USER =================
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

// ================= GET ALL PRODUCTS (ADMIN) =================
export const adminGetProducts = async (req, res) => {
    try {
        const products = await pool.query("SELECT * FROM products ORDER BY id DESC");
        res.status(200).json({ success: true, products: products.rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= ADD PRODUCT (ADMIN) =================
export const adminAddProduct = async (req, res) => {
    try {
        const {
            name, category, gender, price, quantity, size, description,
            image: bodyImage,
            image2, image3, image4, image5,
            sizes,
            is_most_sold, is_new, discount, is_out_of_stock,
        } = req.body;

        // Image comes from Cloudinary via multer, or from body URL
        const image = req.file ? req.file.path : (bodyImage || null);

        if (!name || !category || !gender || !price || !quantity || !description || !image)
            return res.status(400).json({ success: false, message: "Please fill all fields including image" });

        const newProduct = await pool.query(
            `INSERT INTO products 
             (name, category, gender, price, quantity, size, description,
              image, image2, image3, image4, image5,
              sizes, is_most_sold, is_new, discount, is_out_of_stock)
             VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *`,
            [
                name, category, gender, price, quantity,
                size || "6,7,8,9,10,11",
                description, image,
                image2  || null,
                image3  || null,
                image4  || null,
                image5  || null,
                sizes   || "[]",
                is_most_sold    === "true" || is_most_sold    === true  ? true : false,
                is_new          === "true" || is_new          === true  ? true : false,
                discount ? parseInt(discount) : 0,
                is_out_of_stock === "true" || is_out_of_stock === true  ? true : false,
            ]
        );

        res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product: newProduct.rows[0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= UPDATE PRODUCT (ADMIN) =================
export const adminUpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name, category, gender, price, quantity, size, description,
            image: bodyImage,
            image2, image3, image4, image5,
            sizes,
            is_most_sold, is_new, discount, is_out_of_stock,
        } = req.body;

        const product = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
        if (product.rows.length === 0)
            return res.status(404).json({ success: false, message: "Product Not Found" });

        const existing = product.rows[0];

        // Use new uploaded image from Cloudinary, or body URL, or keep existing
        const image = req.file ? req.file.path : (bodyImage || existing.image);

        const updatedProduct = await pool.query(
            `UPDATE products 
             SET name=$1, category=$2, gender=$3, price=$4, quantity=$5, size=$6, description=$7,
                 image=$8, image2=$9, image3=$10, image4=$11, image5=$12,
                 sizes=$13, is_most_sold=$14, is_new=$15, discount=$16, is_out_of_stock=$17
             WHERE id=$18 RETURNING *`,
            [
                name        || existing.name,
                category    || existing.category,
                gender      || existing.gender,
                price       || existing.price,
                quantity    || existing.quantity,
                size        || existing.size,
                description || existing.description,
                image,
                image2  !== undefined ? (image2  || null) : existing.image2,
                image3  !== undefined ? (image3  || null) : existing.image3,
                image4  !== undefined ? (image4  || null) : existing.image4,
                image5  !== undefined ? (image5  || null) : existing.image5,
                sizes   !== undefined ? sizes : (existing.sizes || "[]"),
                is_most_sold !== undefined
                    ? (is_most_sold === "true" || is_most_sold === true)
                    : existing.is_most_sold,
                is_new !== undefined
                    ? (is_new === "true" || is_new === true)
                    : existing.is_new,
                discount !== undefined ? parseInt(discount) : existing.discount,
                is_out_of_stock !== undefined
                    ? (is_out_of_stock === "true" || is_out_of_stock === true)
                    : existing.is_out_of_stock,
                id,
            ]
        );

        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            product: updatedProduct.rows[0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= DELETE PRODUCT (ADMIN) =================
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

// ================= GET ALL ORDERS =================
export const getAllOrders = async (req, res) => {
    try {
        const orders = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");
        res.status(200).json({ success: true, orders: orders.rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= UPDATE ORDER STATUS =================
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await pool.query("SELECT * FROM orders WHERE id=$1", [id]);
        if (order.rows.length === 0)
            return res.status(404).json({ success: false, message: "Order Not Found" });

        const updated = await pool.query(
            "UPDATE orders SET status=$1 WHERE id=$2 RETURNING *",
            [status, id]
        );
        res.status(200).json({ success: true, message: "Order Status Updated", order: updated.rows[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= DELETE ORDER =================
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await pool.query("SELECT * FROM orders WHERE id=$1", [id]);
        if (order.rows.length === 0)
            return res.status(404).json({ success: false, message: "Order Not Found" });

        await pool.query("DELETE FROM orders WHERE id=$1", [id]);
        res.status(200).json({ success: true, message: "Order Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};