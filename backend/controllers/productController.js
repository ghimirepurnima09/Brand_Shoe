import pool from "../config/db.js";

// ================= ADD PRODUCT =================
export const addProduct = async (req, res) => {
    try {
        const {
            name, category, gender, price, quantity, size, description,
            image: bodyImage,
            image2, image3, image4, image5,
            sizes,
            is_most_sold, is_new, discount, is_out_of_stock,
        } = req.body;

        const image = req.file ? req.file.path : bodyImage;

        if (!name || !category || !gender || !price || !quantity || !description || !image) {
            return res.status(400).json({ success: false, message: "Please fill all fields including image" });
        }

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
                sizes   !== undefined ? sizes : existing.sizes,
                is_most_sold    !== undefined
                    ? (is_most_sold    === "true" || is_most_sold    === true)
                    : existing.is_most_sold,
                is_new          !== undefined
                    ? (is_new          === "true" || is_new          === true)
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