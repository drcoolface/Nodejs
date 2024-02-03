const { Schema } = require("mongoose"); // Import Schema from mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  phoneNumber:{
      type: String,
      required : true,
  },
} , { timestamps: true }
);
const ProductSchema = new Schema({
 
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
      type: String ,
      required: false,
  },
  quantity:{
      type: Number,
      required : true,
  },
  product_type: {
    type: String,
    required: true,
  },
 
},   { timestamps: true }
);

const OrderType = {
  productId: {
    type: String,
    required: true,
  },
  quantity:{
    type: Number,
    required : true,
  },
  price: {
    type: Number,
    required: true,
  },
  
};
const OrderSchema = new Schema(
  {
    userId: {
        type: String,
        required: true,
      },

    items:{
        type : [OrderType],
        required : true,
    },
    totalPrice: {
        type :Number,
        required : true,
    },
    date :{
        type: Date,
        required: true,
    }
}
);

const CartItemSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const CartSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  items: [CartItemSchema], 
});

module.exports = { UserSchema, ProductSchema, OrderSchema, CartItemSchema, CartSchema };
