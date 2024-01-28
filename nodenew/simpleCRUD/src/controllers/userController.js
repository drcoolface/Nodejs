
const { validateEntity, doesEntityExist, readFile, writeFile } = require('../utils/Validation');
const fs = require('fs').promises;
const filePath = '/Users/mahesh/developer/Nodeprac/nodenew/simpleCRUD/src/data/users.json';

const UserController = {

  async createUser(req, res) {
    const userData = req.body;
    try {
      validateEntity(userData); 
      const existingUsers = await readFile(filePath);
      if (doesEntityExist(existingUsers, userData.id)) {
        return res.status(400).send('User with the same ID already exists');
      }
      existingUsers.push(userData);
      writeFile(existingUsers, filePath);

      console.log('User stored successfully');
      res.status(201).send('User stored successfully');
    } catch (error) {
      console.error('Error storing user:', error);
      res.status(400).send(`Bad Request: ${error.message}`);
    }
  },

  async getUser(req, res) {
    const userId = parseInt(req.query.id);

    try {
        const users = await readFile(filePath);
        if (userId) {
            // If an ID is provided, return only the user with that ID
            const user = users.find(user => user.id === userId);
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.status(200).json(user);
        } else {
            // If no ID is provided, return all users
            res.status(200).json(users);
        }
    } catch (error) {
        console.error('Error reading the file:', error);
        res.status(500).send('Internal Server Error');
    }
},

  async updateUser(req, res) {
    const userId = parseInt(req.params.id);
    const updatedUserData = req.body;

    try {
      validateEntity(updatedUserData);

      let existingUsers = await readFile(filePath);

      const userIndex = existingUsers.findIndex(user => user.id === userId);
      if (userIndex === -1) {
        return res.status(404).send('User not found');
      }

      existingUsers[userIndex] = { ...existingUsers[userIndex], ...updatedUserData };

      writeFile(existingUsers, filePath)
    //   await fs.writeFile('users.json', JSON.stringify(existingUsers, null, 2));

      console.log('User informtion updated successfully');
      res.status(200).send('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(400).send(`Bad Request: ${error.message}`);
    }
  },

  async deleteUser(req, res) {
    const userIdToDelete = parseInt(req.params.id);

    try {
      let existingUsers = await readFile(filePath);

      const userIndexToDelete = existingUsers.findIndex(user => user.id === userIdToDelete);

      if (userIndexToDelete === -1) {
        return res.status(404).send('User not found');
      }

      existingUsers.splice(userIndexToDelete, 1);
      writeFile(existingUsers, filePath)

    //   await fs.writeFile('users.json', JSON.stringify(existingUsers, null, 2));

      console.log('User deleted successfully');
      res.status(200).send('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Internal Server Error');
    }
  },

}
module.exports = UserController;
