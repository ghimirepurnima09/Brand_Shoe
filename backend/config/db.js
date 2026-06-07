import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Brand_Shoe",
    password: "2042",
    port: 5432,
});


export default pool;