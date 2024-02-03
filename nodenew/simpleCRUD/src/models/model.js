const  mongoose  = require("mongoose")
const { UserSchema, OrderSchema, ProductSchema, CartSchema } = require ("../schema/Index")

 const User = mongoose.model("User", UserSchema);
 const Product = mongoose.model("Product", ProductSchema);
 const Cart = mongoose.model("Cart", CartSchema);
 const Order = mongoose.model("Order", OrderSchema);

 module.exports = {User, Product, Cart, Order}