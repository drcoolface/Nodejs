const fs = require('fs').promises;
const {UserType, productType, OrderType} = require('./Types')
 
const validateEntity = (entity, entityType) => {
  let typeDefinition;
  
  switch (entityType) {
    case 'product':
      typeDefinition = productType;
      break;
    case 'user':
      typeDefinition = UserType;
      break;
    case 'order':
      typeDefinition = OrderType;
      break;
    default:
      throw new Error(`Invalid entityType: ${entityType}`);
  }
  
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

  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    throw new Error('Error writing file', error);
  }
}
module.exports = {validateEntity, doesEntityExist, readFile, writeFile}


