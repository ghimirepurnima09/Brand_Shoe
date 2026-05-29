import pool from "../config/db.js";


// ================= ADD PRODUCT =================

export const addProduct = async (req, res) => {

    try {

        const {
            name,
            category,
            price,
            quantity,
            description,
            image
        } = req.body;

        // VALIDATION

        if (
            !name ||
            !category ||
            !price ||
            !quantity ||
            !description ||
            !image
        ) {

            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });

        }

        // INSERT PRODUCT

        const newProduct = await pool.query(

            `
            INSERT INTO products
            (name, category, price, quantity, description, image)

            VALUES($1,$2,$3,$4,$5,$6)

            RETURNING *
            `,

            [
                name,
                category,
                price,
                quantity,
                description,
                image
            ]

        );

        res.status(201).json({

            success: true,
            message: "Product Added Successfully",
            product: newProduct.rows[0]

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};


// ================= GET ALL PRODUCTS =================

export const getProducts = async (req, res) => {

    try {

        const products = await pool.query(
            "SELECT * FROM products ORDER BY id DESC"
        );

        res.status(200).json({

            success: true,
            products: products.rows

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};


// ================= GET SINGLE PRODUCT =================

export const getSingleProduct = async (req, res) => {

    try {

        const { id } = req.params;

        const product = await pool.query(
            "SELECT * FROM products WHERE id=$1",
            [id]
        );

        if (product.rows.length === 0) {

            return res.status(404).json({

                success: false,
                message: "Product Not Found"

            });

        }

        res.status(200).json({

            success: true,
            product: product.rows[0]

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};


// ================= DELETE PRODUCT =================

export const deleteProduct = async (req, res) => {

    try {

        const { id } = req.params;

        const product = await pool.query(
            "SELECT * FROM products WHERE id=$1",
            [id]
        );

        if (product.rows.length === 0) {

            return res.status(404).json({

                success: false,
                message: "Product Not Found"

            });

        }

        await pool.query(
            "DELETE FROM products WHERE id=$1",
            [id]
        );

        res.status(200).json({

            success: true,
            message: "Product Deleted Successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};



// ================= UPDATE PRODUCT =================

export const updateProduct = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            name,
            category,
            price,
            quantity,
            description,
            image
        } = req.body;

        const product = await pool.query(
            "SELECT * FROM products WHERE id=$1",
            [id]
        );

        if (product.rows.length === 0) {

            return res.status(404).json({

                success: false,
                message: "Product Not Found"

            });

        }

        const updatedProduct = await pool.query(

            `
            UPDATE products

            SET
            name=$1,
            category=$2,
            price=$3,
            quantity=$4,
            description=$5,
            image=$6

            WHERE id=$7

            RETURNING *
            `,

            [
                name,
                category,
                price,
                quantity,
                description,
                image,
                id
            ]

        );

        res.status(200).json({

            success: true,
            message: "Product Updated Successfully",
            product: updatedProduct.rows[0]

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};