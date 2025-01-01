const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
 
// API endpoint to get all items
app.get('/items', (req, res) => {
 
  res.json({message:"succesfull"});
});

// API endpoint to add a new item
app.post('/items', async (req, res) => {
  const { item_name, item_mfg, item_exp } = req.body;
  
  // Validate required fields
  if (!item_name || !item_mfg || !item_exp) {
    res.status(400).json({ error: 'All fields are required: item_name, item_mfg, item_exp' });
    return;
  }

  try {
      const query = `
          INSERT INTO items (item_name, item_mfg, item_exp)
          VALUES ($1, $2, $3)
          RETURNING *
      `;
      
      const values = [item_name, item_mfg, item_exp];
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