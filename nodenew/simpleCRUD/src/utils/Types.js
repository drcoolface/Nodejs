const productType = {
    id :{
        type: Number,
        required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
        type: String | null,
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
};

const UserType = {
  id :{
      type: Number,
      required: true,
  },
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
};

const OrderType = {
  productId: {
    type: Number,
    required: true,
  },
  productQuantity:{
    type: Number,
    required : true,
  },
  price: {
    type: Number,
    required: true,
  },
  
};

const OrderInfo = {
    userId: {
        type: Number,
        required: true,
      },
      OrderId: {
        type: Number,
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

module.exports = {UserType,productType,OrderType, OrderInfo}