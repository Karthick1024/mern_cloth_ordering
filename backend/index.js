const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
require("dotenv").config(); // Load environment variables

// Middleware for JSON parsing
app.use(express.json());

// Database connection
mongoose.connect(
  process.env.MONGO_URI || "mongodb+srv://karthickcs10124:snapdragon675@cluster0.hpnk2.mongodb.net/e-commerce",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// API creation
app.get("/", (req, res) => {
  res.send("Express app is running");
});

// Image storage configuration
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

// Serving static files for images
app.use("/images", express.static("upload/images"));

// Creating upload endpoint
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `${process.env.BASE_URL || `http://localhost:${port}`}/images/${req.file.filename}`,
  });
});

// Schema for products
const Product = mongoose.model("product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

// Add product endpoint
app.post("/addproduct", async (req, res) => {
  const products = await Product.find({});
  const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    description: req.body.description,
  });

  await product.save();
  res.json({ success: true, name: req.body.name });
});

// Remove product endpoint
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
});

// Get all products endpoint
app.get("/allproducts", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

// Schema for users
const User = mongoose.model("user", {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
});

// Signup endpoint
app.post("/signup", async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json({ success: false, errors: "User already exists" });
  }

  const cartData = {};
  for (let i = 0; i < 300; i++) {
    cartData[i] = 0;
  }

  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData,
  });

  await user.save();
  const token = jwt.sign({ id: user.id }, "secret_ecom");
  res.json({ success: true, token });
});

// Login endpoint
app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && req.body.password === user.password) {
    const token = jwt.sign({ id: user.id }, "secret_ecom");
    res.json({ success: true, token });
  } else {
    res.json({ success: false, errors: "Invalid credentials" });
  }
});

// Middleware to fetch user
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Cart endpoints
app.post("/addtocart", fetchUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.cartData[req.body.itemId] += 1;
  await user.save();
  res.send("Added to cart");
});

app.post("/removefromcart", fetchUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user.cartData[req.body.itemId] > 0) user.cartData[req.body.itemId] -= 1;
  await user.save();
  res.send("Removed from cart");
});

app.post("/getcart", fetchUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.cartData);
});

// Other endpoints
app.get("/newcollections", async (req, res) => {
  const products = await Product.find({});
  res.send(products.slice(-8));
});

app.get("/popularinwomen", async (req, res) => {
  const products = await Product.find({ category: "women" });
  res.send(products.slice(0, 4));
});

// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
