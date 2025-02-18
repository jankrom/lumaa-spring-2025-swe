import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import pool from "../config/db"

export const register = async (req: Request, res: Response) => {
  try {
    console.log("Registering user:", req.body)
    const { username, password } = req.body

    // Check if user exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    )

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "Username already exists" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const newUser = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
      [username, hashedPassword]
    )

    const user = newUser.rows[0]
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!
    )

    res.json({ token, user })
  } catch (err) {
    console.error("Register error:", err)
    res.status(500).json({ error: "Server error" })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    // Check if user exists
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ])

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const user = result.rows[0]

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Create and send token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!
    )

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    })
  } catch (err) {
    console.error("Login error:", err)
    res.status(500).json({ error: "Server error" })
  }
}
