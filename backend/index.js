// const port = process.env.PORT ||  4000;
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const cors = require("cors");
// const { log } = require("console");

// app.use(express.json());
// app.use(cors());

// // Database connection mongodb
// mongoose.connect(
//   "mongodb+srv://karthickcs10124:snapdragon675@cluster0.hpnk2.mongodb.net/e-commerce"
// );

// // API creation

// app.get("/", (req, res) => {
//   res.send("Express app is running");
// });

// //Image storage

// const storage = multer.diskStorage({
//   destination: "./upload/images",
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({ storage: storage });

// // Creating upload Endpoint

// app.use("/images", express.static("upload/images"));

// app.post("/upload", upload.single("product"), (req, res) => {
//   res.json({
//     success: 1,
//     image_url: `http://localhost:${port}/images/${req.file.filename}`,
//   });
// });

// //scheme for creating Products

// // const Product = mongoose.model("product", {
// //   id: {
// //     type: Number,
// //     required: true,
// //   },
// //   name: {
// //     type: String,
// //     required: true,
// //   },
// //   image: {
// //     type: String,
// //     required: true,
// //   },
// //   category: {
// //     type: String,
// //     required: true,
// //   },
// //   new_price: {
// //     type: Number,
// //     required: true,
// //   },
// //   old_price: {
// //     type: Number,
// //     required: true,
// //   },

// //   date: {
// //     type: Date,
// //     default: Date.now,
// //   },
// //   available: {
// //     description: {
      
// //       type: String,
// //       required: true, 
// //     },
// //     type: Boolean,
// //     default: true,
// //   },
// // });
// const Product = mongoose.model("product", {
//     id: {
//       type: Number,
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     new_price: {
//       type: Number,
//       required: true,
//     },
//     old_price: {
//       type: Number,
//       required: true,
//     },
//     description: {
//       type: String,  
//       required: true, 
//     },
//     date: {
//       type: Date,
//       default: Date.now,
//     },
//     available: {
//       type: Boolean,
//       default: true,
//     },
//   });
  

// app.post("/addproduct", async (req, res) => {
//   let products = await Product.find({});
//   let id;
//   if (products.length > 0) {
//     let last_product_array = products.slice(-1);
//     let last_product = last_product_array[0];
//     id = last_product.id + 1;
//   } else {
//     id = 1;
//   }
//   const product = new Product({
//     id: id,
//     name: req.body.name,
//     image: req.body.image,
//     category: req.body.category,
//     new_price: req.body.new_price,
//     old_price: req.body.old_price,
//     description: req.body.description,
//   });
//   console.log(product);
//   await product.save();
//   console.log("Saved");
//   res.json({
//     success: true,
//     name: req.body.name,
//   });
// });

  
// //creating api for deleting products

// app.post("/removeproduct", async (req, res) => {
//   await Product.findOneAndDelete({ id: req.body.id });
//   console.log("Removed");
//   res.json({
//     success: true,
//     name: req.body.name,
//   });
// });

// //creating API for getting all products
// app.get("/allproducts", async (req, res) => {
//   let products = await Product.find({});
//   console.log("All products Fetched");
//   res.send(products);
// });

// //Scheme creating for user module

// const users = mongoose.model("Users", {
//   name: {
//     type: String,
//   },
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: {
//     type: String,
//   },
//   cartData: {
//     type: Object,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// //creating Endpoint for registering the user
// app.post("/signup", async (req, res) => {
//   let check = await users.findOne({ email: req.body.email });
//   if (check) {
//     return res
//       .status(400)
//       .json({
//         success: false,
//         errors: "Existing user found with same email address",
//       });
//   }
//   let cart = {};
//   for (let i = 0; i < 300; i++) {
//     cart[i] = 0;
//   }
//   const user = new users({
//     name: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//     cartData: cart,
//   });
//   await user.save();

//   const data = {
//     user: {
//       id: user.id,
//     },
//   };

//   const token = jwt.sign(data, "secret_ecom");
//   res.json({ success: true, token });
// });

// //creating endpoint for userlogin
// app.post("/login", async (req, res) => {
//   let user = await users.findOne({ email: req.body.email });
//   if (user) {
//     const passCompare = req.body.password === user.password;
//     if (passCompare) {
//       const data = {
//         user: {
//           id: user.id,
//         },
//       };
//       const token = jwt.sign(data, "secret_ecom");
//       res.json({ success: true, token });
//     } else {
//       res.json({ success: false, errors: "Wrong Password" });
//     }
//   } else {
//     res.json({ success: false, errors: "Wrong EmailId" });
//   }
// });

// //cretaing endpoint for newcollection
// app.get("/newcollections", async (req, res) => {
//   let products = await Product.find({});
//   let newcollection = products.slice(1).slice(-8);
//   console.log("New Collections products Fetched");
//   res.send(newcollection);
// });

// //popular in women
// app.get("/popularinwomen", async (req, res) => {
//   let products = await Product.find({ category: "women" });
//   let popularwomen = products.slice(0, 4);
//   console.log("popular in women products Fetched");
//   res.send(popularwomen);
// });

// //cretae middleware to fetch user
// const fetchUser = async (req, res, next) => {
//   const token = req.header("auth-token");
//   if (!token) {
//     res.status(401).send({ error: "Please authenticate using valid token" });
//   } else {
//     try {
//       const data = jwt.verify(token, "secret_ecom");
//       req.user = data.user;
//       next();
//     } catch (error) {
//       res
//         .status(401)
//         .send({ error: "Please authenticate using a valid token" });
//     }
//   }
// };
// //creating enpoint for cart

// app.post("/addtocart", fetchUser, async (req, res) => {
//   console.log("Added", req.body.itemId);
//   let userData = await users.findOne({ _id: req.user.id });
//   userData.cartData[req.body.itemId] += 1;
//   // await users.findByIdAndUpdate({id:req.user.id},{cartData:userData.cartData});
//   await users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });

//   res.send("Added");
// });

// //remove from cart
// app.post("/removefromcart", fetchUser, async (req, res) => {
//   console.log("Removed", req.body.itemId);
//   let userData = await users.findOne({ _id: req.user.id });
//   if (userData.cartData[req.body.itemId] > 0)
//     userData.cartData[req.body.itemId] -= 1;
//   // await users.findByIdAndUpdate({id:req.user.id},{cartData:userData.cartData});
//   await users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
//   res.send("Removed");
// });

// //get cart data

// app.post("/getcart", fetchUser, async (req, res) => {
//   console.log("Get Cart");
//   let userData = await users.findOne({ _id:req.user.id });
//   res.json(userData.cartData);
// })

// app.listen(port, (error) => {
//   if (!error) {
//     console.log("Server Running on Port " + port);
//   } else {
//     console.log("Error : " + error);
//   }
// });
const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

// Middleware for JSON parsing and CORS handling
app.use(express.json());

// Configure CORS middleware
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://mern-cloth-ordering.vercel.app",
      "https://mern-cloth-ordering-website.onrender.com",
    ];
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "auth-token", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// Define BASE_URL for dynamic URL generation
const BASE_URL = process.env.BASE_URL || `http://localhost:${port}`;

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
    image_url: `${BASE_URL}/images/${req.file.filename}`,
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
app.listen(port, () => console.log(`Server running on ${BASE_URL}`));
