import pool from "../config/db.js";


// ================= ADD PRODUCT =================

export const addProduct = async (req, res) => {

    try {

        console.log(req.body);

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
            (
                name,
                category,
                price,
                quantity,
                description,
                image
            )

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