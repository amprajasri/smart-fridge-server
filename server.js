const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
 
// API endpoint to get all items
app.get('/items', (req, res) => {
 
  res.json({message:"succesfull"});
});

// API endpoint to add a new item
app.post('/items', (req, res) => {
    const { item_name, item_mfg, item_exp } = req.body;
    
    // Validate required fields
    if (!item_name || !item_mfg || !item_exp) {
      res.status(400).json({ error: 'All fields are required: item_name, item_mfg, item_exp' });
      return;
    }
  
    return res.status(200).json({
      receivedData: {
          item_name,
          item_mfg,
          item_exp
      }
  });
  
    
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