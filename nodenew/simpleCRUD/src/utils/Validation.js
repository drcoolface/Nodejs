const fs = require('fs').promises;
// const filePath = '../data/products.json'
 
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


const validateEntity = (entity, entityType) => {
  const typeDefinition = entityType === 'product' ? productType : UserType;
  
  for (const key in typeDefinition) {
      const { type, required } = typeDefinition[key];
      const value = entity[key];
      
      if (required && (value === undefined || value === null)) {
          throw new Error(`${key} is required.`);
      }

      if (type && typeof value !== type.name.toLowerCase()) {
          throw new Error(`${key} must be of type ${type.name}.`);
      }
  }
  
  return true;
}

const doesEntityExist = (entities, entityId) => {
  return entities.some(entity => entity.id === entityId);
};



const readFile = async (filePath) => {
    try {
        const existingData = await fs.readFile(filePath, 'utf8');
        return JSON.parse(existingData);
    } catch (error) {
        console.error('Error reading or parsing existing data:', error);
        throw new Error('Internal Server Error');
    }
};

const writeFile =  async(data, filePath)=> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));

}
module.exports = {validateEntity, doesEntityExist, readFile, writeFile}


