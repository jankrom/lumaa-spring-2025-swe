import { Request, Response } from "express"
import pool from "../config/db"

interface AuthRequest extends Request {
  user?: { id: number; username: string }
}

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user!.id]
    )
    res.json(result.rows)
  } catch (err) {
    console.error("Get tasks error:", err)
    res.status(500).json({ error: "Server error" })
  }
}

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body
    const result = await pool.query(
      "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, req.user!.id]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error("Create task error:", err)
    res.status(500).json({ error: "Server error" })
  }
}

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, is_complete } = req.body

    // Verify task belongs to user
    const taskCheck = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
      [id, req.user!.id]
    )

    if (taskCheck.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" })
    }

    const result = await pool.query(
      "UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), is_complete = COALESCE($3, is_complete) WHERE id = $4 AND user_id = $5 RETURNING *",
      [title, description, is_complete, id, req.user!.id]
    )

    res.json(result.rows[0])
  } catch (err) {
    console.error("Update task error:", err)
    res.status(500).json({ error: "Server error" })
  }
}

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    // Verify task belongs to user
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user!.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.json({ message: "Task deleted successfully" })
  } catch (err) {
    console.error("Delete task error:", err)
    res.status(500).json({ error: "Server error" })
  }
}
