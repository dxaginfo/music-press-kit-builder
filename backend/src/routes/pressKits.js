const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const db = require('../database/db');

const router = express.Router();

/**
 * @route GET api/press-kits
 * @desc Get all press kits for a user
 * @access Private
 */
router.get('/', auth, async (req, res) => {
  try {
    // Get user press kits from database
    // const pressKits = await db.query('SELECT * FROM press_kits WHERE user_id = $1', [req.userId]);

    // Simulated press kits for development
    const pressKits = [
      {
        id: 'pk-uuid-1',
        title: 'My Band EPK',
        slug: 'my-band-epk',
        is_published: true,
        view_count: 125,
        created_at: new Date('2023-01-15'),
        updated_at: new Date('2023-06-20')
      },
      {
        id: 'pk-uuid-2',
        title: 'Album Release EPK',
        slug: 'album-release-epk',
        is_published: false,
        view_count: 0,
        created_at: new Date('2023-05-10'),
        updated_at: new Date('2023-05-10')
      }
    ];

    res.json(pressKits);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route GET api/press-kits/:id
 * @desc Get a specific press kit by ID
 * @access Private
 */
router.get('/:id', auth, async (req, res) => {
  try {
    // Get press kit from database
    // const pressKit = await db.query(
    //   'SELECT * FROM press_kits WHERE id = $1 AND user_id = $2',
    //   [req.params.id, req.userId]
    // );
    // 
    // if (pressKit.rows.length === 0) {
    //   return res.status(404).json({ message: 'Press kit not found' });
    // }

    // Simulated press kit for development
    const pressKit = {
      id: req.params.id,
      user_id: req.userId,
      title: 'My Band EPK',
      slug: 'my-band-epk',
      template_id: 'template-uuid',
      is_published: true,
      primary_color: '#3f51b5',
      secondary_color: '#f50057',
      font_choice: 'Roboto',
      custom_css: '',
      meta_description: 'Official press kit for My Band',
      view_count: 125,
      created_at: new Date('2023-01-15'),
      updated_at: new Date('2023-06-20')
    };

    res.json(pressKit);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route POST api/press-kits
 * @desc Create a new press kit
 * @access Private
 */
router.post(
  '/',
  [
    auth,
    body('title', 'Title is required').not().isEmpty(),
    body('template_id', 'Template ID is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      template_id,
      primary_color,
      secondary_color,
      font_choice,
      meta_description
    } = req.body;

    try {
      // Create slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');

      // Create press kit in database
      // const newPressKit = await db.query(
      //   `INSERT INTO press_kits (
      //     user_id, title, slug, template_id, primary_color, secondary_color, 
      //     font_choice, meta_description, is_published
      //   ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      //   [
      //     req.userId,
      //     title,
      //     slug,
      //     template_id,
      //     primary_color || '#3f51b5',
      //     secondary_color || '#f50057',
      //     font_choice || 'Roboto',
      //     meta_description || '',
      //     false // Default to unpublished
      //   ]
      // );

      // Simulated new press kit for development
      const newPressKit = {
        id: 'new-pk-uuid',
        user_id: req.userId,
        title,
        slug,
        template_id,
        primary_color: primary_color || '#3f51b5',
        secondary_color: secondary_color || '#f50057',
        font_choice: font_choice || 'Roboto',
        meta_description: meta_description || '',
        is_published: false,
        view_count: 0,
        created_at: new Date(),
        updated_at: new Date()
      };

      res.status(201).json(newPressKit);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

/**
 * @route PUT api/press-kits/:id
 * @desc Update a press kit
 * @access Private
 */
router.put('/:id', auth, async (req, res) => {
  const {
    title,
    template_id,
    primary_color,
    secondary_color,
    font_choice,
    custom_css,
    meta_description,
    is_published
  } = req.body;

  try {
    // Check if press kit exists
    // const pressKit = await db.query(
    //   'SELECT * FROM press_kits WHERE id = $1 AND user_id = $2',
    //   [req.params.id, req.userId]
    // );
    // 
    // if (pressKit.rows.length === 0) {
    //   return res.status(404).json({ message: 'Press kit not found' });
    // }

    // Build update object
    const pressKitFields = {};
    if (title) pressKitFields.title = title;
    if (template_id) pressKitFields.template_id = template_id;
    if (primary_color) pressKitFields.primary_color = primary_color;
    if (secondary_color) pressKitFields.secondary_color = secondary_color;
    if (font_choice) pressKitFields.font_choice = font_choice;
    if (custom_css !== undefined) pressKitFields.custom_css = custom_css;
    if (meta_description !== undefined) pressKitFields.meta_description = meta_description;
    if (is_published !== undefined) pressKitFields.is_published = is_published;
    pressKitFields.updated_at = new Date();

    // Update press kit in database
    // const updatedPressKit = await db.query(
    //   `UPDATE press_kits SET 
    //     title = COALESCE($1, title),
    //     template_id = COALESCE($2, template_id),
    //     primary_color = COALESCE($3, primary_color),
    //     secondary_color = COALESCE($4, secondary_color),
    //     font_choice = COALESCE($5, font_choice),
    //     custom_css = COALESCE($6, custom_css),
    //     meta_description = COALESCE($7, meta_description),
    //     is_published = COALESCE($8, is_published),
    //     updated_at = $9
    //   WHERE id = $10 AND user_id = $11 RETURNING *`,
    //   [
    //     pressKitFields.title,
    //     pressKitFields.template_id,
    //     pressKitFields.primary_color,
    //     pressKitFields.secondary_color,
    //     pressKitFields.font_choice,
    //     pressKitFields.custom_css,
    //     pressKitFields.meta_description,
    //     pressKitFields.is_published,
    //     pressKitFields.updated_at,
    //     req.params.id,
    //     req.userId
    //   ]
    // );

    // Simulated updated press kit for development
    const updatedPressKit = {
      id: req.params.id,
      user_id: req.userId,
      title: pressKitFields.title || 'My Band EPK',
      slug: 'my-band-epk',
      template_id: pressKitFields.template_id || 'template-uuid',
      is_published: pressKitFields.is_published !== undefined ? pressKitFields.is_published : true,
      primary_color: pressKitFields.primary_color || '#3f51b5',
      secondary_color: pressKitFields.secondary_color || '#f50057',
      font_choice: pressKitFields.font_choice || 'Roboto',
      custom_css: pressKitFields.custom_css || '',
      meta_description: pressKitFields.meta_description || 'Official press kit for My Band',
      view_count: 125,
      created_at: new Date('2023-01-15'),
      updated_at: pressKitFields.updated_at
    };

    res.json(updatedPressKit);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route DELETE api/press-kits/:id
 * @desc Delete a press kit
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if press kit exists and belongs to user
    // const pressKit = await db.query(
    //   'SELECT * FROM press_kits WHERE id = $1 AND user_id = $2',
    //   [req.params.id, req.userId]
    // );
    // 
    // if (pressKit.rows.length === 0) {
    //   return res.status(404).json({ message: 'Press kit not found' });
    // }

    // Delete press kit from database
    // await db.query('DELETE FROM press_kits WHERE id = $1', [req.params.id]);

    res.json({ message: 'Press kit removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
