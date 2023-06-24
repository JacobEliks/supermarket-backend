
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    description: String,
    image: String,
    storage: String,
    price_id: String,
    nutrition: {
        carbs: Number,
        fat: Number,
        protein: Number,
        salt: Number
    }
});

const Product = mongoose.model("Product", productSchema);

app.get('/', (req, res) => {
  res.send('Welcome to the backend app!');
});


app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.set('Access-Control-Allow-Origin', '*');
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({id: parseInt(req.params.id, 10)})
    res.set('Access-Control-Allow-Origin', '*');
    res.json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' });
  }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});