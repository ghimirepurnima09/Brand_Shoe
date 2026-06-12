import pool from "../config/db.js";
import { getIO } from "../socket.js";

// ─────────────────────────────────────────────
// Place a new order
// ─────────────────────────────────────────────
export const placeOrder = async (req, res) => {
  try {
    const {
      user_id, user_name, user_email, address, city, state, zip,
      items, subtotal, shipping, tax, total, payment,
    } = req.body;

    if (!user_name || !address || !items || !total)
      return res.status(400).json({ success: false, message: "Missing required fields" });

    const result = await pool.query(
      `INSERT INTO orders
       (user_id, user_name, user_email, address, city, state, zip, items, subtotal, shipping, tax, total_price, payment_method, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,'pending') RETURNING *`,
      [
        user_id || null, user_name, user_email || "", address, city || "",
        state || "", zip || "", JSON.stringify(items), subtotal,
        shipping || 0, tax || 0, total, payment || "cod",
      ]
    );

    res.status(201).json({ success: true, message: "Order placed!", order: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ─────────────────────────────────────────────
// Get all orders (admin)
// ─────────────────────────────────────────────
export const getAllOrders = async (req, res) => {
  try {
    const orders = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");
    res.status(200).json({ success: true, orders: orders.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ─────────────────────────────────────────────
// Update order status (admin) + notify user via socket
// ─────────────────────────────────────────────
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["pending", "processing", "shipped", "delivered", "cancelled"];
    if (!allowed.includes(status.toLowerCase()))
      return res.status(400).json({ success: false, message: "Invalid status" });

    const result = await pool.query(
      "UPDATE orders SET status=$1 WHERE id=$2 RETURNING *",
      [status, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: "Order not found" });

    const updatedOrder = result.rows[0];

    // Emit real-time notification to the user who owns this order
    if (updatedOrder.user_id) {
      try {
        const io = getIO();
        io.to(`user_${updatedOrder.user_id}`).emit("order_status_updated", {
          orderId: updatedOrder.id,
          status:  updatedOrder.status,
        });
        console.log(`📢 Notified user_${updatedOrder.user_id}: Order #${updatedOrder.id} → ${updatedOrder.status}`);
      } catch (socketErr) {
        console.error("Socket emit failed:", socketErr.message);
      }
    }

    res.status(200).json({ success: true, message: "Status updated", order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ─────────────────────────────────────────────
// Delete an order (admin)
// ─────────────────────────────────────────────
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const exists = await pool.query("SELECT id FROM orders WHERE id=$1", [id]);
    if (exists.rows.length === 0)
      return res.status(404).json({ success: false, message: "Order not found" });

    await pool.query("DELETE FROM orders WHERE id=$1", [id]);
    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ─────────────────────────────────────────────
// Get orders for logged-in user
// ─────────────────────────────────────────────
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await pool.query(
      "SELECT * FROM orders WHERE user_id=$1 ORDER BY created_at DESC",
      [userId]
    );
    res.status(200).json({ success: true, orders: orders.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ─────────────────────────────────────────────
// Cancel an order (user)
// ─────────────────────────────────────────────
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await pool.query(
      "SELECT * FROM orders WHERE id=$1 AND user_id=$2",
      [id, userId]
    );

    if (order.rows.length === 0)
      return res.status(404).json({ success: false, message: "Order not found" });

    if (order.rows[0].status === "delivered")
      return res.status(400).json({ success: false, message: "Cannot cancel a delivered order" });

    if (order.rows[0].status === "cancelled")
      return res.status(400).json({ success: false, message: "Order is already cancelled" });

    const result = await pool.query(
      "UPDATE orders SET status='cancelled' WHERE id=$1 RETURNING *",
      [id]
    );

    res.status(200).json({ success: true, message: "Order cancelled", order: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};