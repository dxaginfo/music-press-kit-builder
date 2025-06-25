const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @route POST api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post(
  '/register',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user already exists
      // This would be implemented with actual database queries
      // const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      // if (userExists.rows.length > 0) {
      //   return res.status(400).json({ message: 'User already exists' });
      // }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      // const newUser = await db.query(
      //   'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      //   [name, email, hashedPassword]
      // );

      // Simulated response
      const newUser = { id: 'uuid-placeholder', name, email };

      // Create token
      const token = jwt.sign(
        { userId: newUser.id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1h' }
      );

      res.status(201).json({
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

/**
 * @route POST api/auth/login
 * @desc Authenticate user & get token
 * @access Public
 */
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      // const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      // if (user.rows.length === 0) {
      //   return res.status(400).json({ message: 'Invalid Credentials' });
      // }

      // Simulated user for development
      const user = {
        id: 'uuid-placeholder',
        name: 'Test User',
        email: email,
        password_hash: await bcrypt.hash('password123', 10) // Simulated hashed password
      };

      // Check password
      // const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
      // if (!isMatch) {
      //   return res.status(400).json({ message: 'Invalid Credentials' });
      // }

      // Simulate successful login for development
      const isMatch = true;

      // Create token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1h' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

/**
 * @route GET api/auth/user
 * @desc Get user data
 * @access Private
 */
router.get('/user', auth, async (req, res) => {
  try {
    // Get user data from database
    // const user = await db.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [req.userId]);
    // if (user.rows.length === 0) {
    //   return res.status(404).json({ message: 'User not found' });
    // }

    // Simulated user data for development
    const user = {
      id: req.userId,
      name: 'Test User',
      email: 'user@example.com',
      created_at: new Date()
    };

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
