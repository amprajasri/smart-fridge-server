const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
 
// API endpoint to get all items
app.get('/items', async (req, res) => {
  try {
      const query = 'SELECT * FROM items ORDER BY item_id';
      const result = await pool.query(query);
      
      res.status(200).json({
          message: 'Items retrieved successfully',
          items: result.rows
      });
  } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ 
          error: 'Error fetching items from database',
          details: error.message 
      });
  }
});

// API endpoint to add a new item
app.post('/items', async (req, res) => {
  const { item_name, item_mfd, item_exp } = req.body;
  
  // Validate required fields
  if (!item_name || !item_mfd || !item_exp) {
    res.status(400).json({ error: 'All fields are required: item_name, item_mfd, item_exp' });
    return;
  }

  try {
      const query = `
          INSERT INTO items (item_name, item_mfd, item_exp)
          VALUES ($1, $2, $3)
          RETURNING *
      `;
      
      const values = [item_name, item_mfd, item_exp];
      const result = await pool.query(query, values);
      
      res.status(201).json({
          message: 'Item added successfully',
          item: result.rows[0]
      });
  } catch (error) {
      console.error('Error inserting item:', error);
      res.status(500).json({ 
          error: 'Error adding item to database',
          details: error.message 
      });
  }
});

  app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome To MERN Stack Tutorial'); // Changed status code to 200
  });
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;