const fs = require('fs').promises;
 
 
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


 const validateProduct = (product) => {
    for (const key in productType) {
      const { type, required } = productType[key];
      const value = product[key];
  
      if (required && (value === undefined || value === null)) {
        throw new Error(`${key} is required.`);
      }

      if (type && typeof value !== type.name.toLowerCase()) {
        throw new Error(`${key} must be of type ${type.name}.`);
      }
    }
  
    return true;
}
const isProductExists = (products, productId) => {
  return products.some(product => product.id === productId);
};


const readProductsFile = async () => {
    try {
        const existingData = await fs.readFile('products.json', 'utf8');
        return JSON.parse(existingData);
    } catch (error) {
        console.error('Error reading or parsing existing data:', error);
        throw new Error('Internal Server Error');
    }
};
module.exports = {validateProduct, isProductExists, readProductsFile}


