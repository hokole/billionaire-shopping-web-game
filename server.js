const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.static('public'));

app.get('/fetch-image', async (req, res) => {
  const imageUrl = req.query.url;
  
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageData = Buffer.from(response.data, 'base64');
    res.contentType('image/jpeg');
    res.send(imageData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching image');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
