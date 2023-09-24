const express = require("express");
const multer = require("multer");
const VerifyAdmin = require("../Middlewares/verifyAdmin");
const VerifyUser = require("../Middlewares/verifyUser");
const GetAllUser = require("../Controllers/Admin/GetAllUser.controller");
const GetUserOrder = require("../Controllers/Admin/GetUserOrders.controller");
const CheckAdmin = require("../Controllers/Admin/CheckAdmin.controller");
const UpdateProduct = require("../Controllers/Admin/UpdateProduct.controller");
const DeleteProduct = require("../Controllers/Admin/DeleteProduct.controller");
const AddProduct = require("../Controllers/Admin/AddProduct.controller");
const UploadImage = require("../Controllers/Admin/UploadImage.controller");
const router = express.Router();

const upload = multer({
    dest: "uploads/",
});

const protectedRoute = express.Router();

protectedRoute.use(VerifyUser);
protectedRoute.use(VerifyAdmin);


// Protected Routes
protectedRoute.get("/users", GetAllUser);
protectedRoute.post("/upload", upload.single("image"), UploadImage);
protectedRoute.put('/products/:productId', UpdateProduct)
protectedRoute.post('/products', AddProduct)
protectedRoute.delete('/products/:productId', DeleteProduct)
protectedRoute.get("/:userId/orders", GetUserOrder);
protectedRoute.get("/", CheckAdmin);
router.use("/", protectedRoute);


module.exports = router;