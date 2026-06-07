import pool from "../config/db.js";

// ================= ADD PRODUCT =================
export const addProduct = async (req, res) => {
    try {
        const { name, category, gender, price, quantity, size, description, image: bodyImage } = req.body;

        const image = req.file ? req.file.path : bodyImage;

        if (!name || !category || !gender || !price || !quantity || !description || !image) {
            return res.status(400).json({ success: false, message: "Please fill all fields including image" });
        }

        const newProduct = await pool.query(
            `INSERT INTO products (name, category, gender, price, quantity, size, description, image)
             VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
            [name, category, gender, price, quantity, size || "6,7,8,9,10,11", description, image]
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

// ================= GET ALL PRODUCTS =================
export const getProducts = async (req, res) => {
    try {
        const products = await pool.query("SELECT * FROM products ORDER BY id DESC");
        res.status(200).json({ success: true, products: products.rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= GET SINGLE PRODUCT =================
export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await pool.query("SELECT * FROM products WHERE id=$1", [id]);

        if (product.rows.length === 0)
            return res.status(404).json({ success: false, message: "Product Not Found" });

        res.status(200).json({ success: true, product: product.rows[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= UPDATE PRODUCT =================
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, gender, price, quantity, size, description, image: bodyImage } = req.body;

        const product = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
        if (product.rows.length === 0)
            return res.status(404).json({ success: false, message: "Product Not Found" });

        const existing = product.rows[0];
        const image = req.file ? req.file.path : (bodyImage || existing.image);

        const updatedProduct = await pool.query(
            `UPDATE products 
             SET name=$1, category=$2, gender=$3, price=$4, quantity=$5, size=$6, description=$7, image=$8
             WHERE id=$9 RETURNING *`,
            [
                name        || existing.name,
                category    || existing.category,
                gender      || existing.gender,
                price       || existing.price,
                quantity    || existing.quantity,
                size        || existing.size,
                description || existing.description,
                image,
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

// ================= DELETE PRODUCT =================
export const deleteProduct = async (req, res) => {
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

// ================= MEN PRODUCTS =================
export const getMenProducts = async (req, res) => {
    try {
        const products = await pool.query(
            "SELECT * FROM products WHERE gender='Men' ORDER BY id DESC"
        );
        res.status(200).json({ success: true, products: products.rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= WOMEN PRODUCTS =================
export const getWomenProducts = async (req, res) => {
    try {
        const products = await pool.query(
            "SELECT * FROM products WHERE gender='Women' ORDER BY id DESC"
        );
        res.status(200).json({ success: true, products: products.rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= KIDS PRODUCTS =================
export const getKidsProducts = async (req, res) => {
    try {
        const products = await pool.query(
            "SELECT * FROM products WHERE gender='Kids' ORDER BY id DESC"
        );
        res.status(200).json({ success: true, products: products.rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= MOST SOLD =================
export const getMostSoldProducts = async (req, res) => {
    try {
        const products = await pool.query(
            "SELECT * FROM products WHERE is_most_sold=true ORDER BY id DESC"
        );
        res.status(200).json({ success: true, products: products.rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= NEW ARRIVALS =================
export const getNewArrivalProducts = async (req, res) => {
    try {
        const products = await pool.query(
            "SELECT * FROM products WHERE is_new=true ORDER BY id DESC"
        );
        res.status(200).json({ success: true, products: products.rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ================= OFFERS =================
export const getOffersProducts = async (req, res) => {
    try {
        const products = await pool.query(
            "SELECT * FROM products WHERE discount > 0 ORDER BY id DESC"
        );
        res.status(200).json({ success: true, products: products.rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};