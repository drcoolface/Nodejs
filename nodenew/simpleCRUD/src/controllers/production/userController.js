const { User } = require("../../models/model") 

const UserController = {
    async createUser(req, res) {
        const userData = req.body;
        try {
          const user = await User.create(userData);
          res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
          });
        } catch (error) {
          console.error('Error in creating user:', error);
          res.status(500).json({
            success: false,
            message: error.message
          });
        }
    },

    async getUser(req,res) 
    {
        const userId = req.query.id;
        try
        {
            if(userId)
            {
                const result = await User.findById(userId)
                res.status(200).json
                ({
                success:true,
                message : "1 user fetched",
                data : result
                })
            }
            else
            {
                const result = await User.find();
                res.status(200).json
                ({
                success:true,
                message : `${result.length} users fetched`,
                data : result
                })
            }
        }
        catch(error)
        {
            res.json({
                success:false,
                message : error.message
            })
        }
    },

    async updateUser(req, res) 
    {
        const userId = req.params.id;
        const UpdatedUserdata = req.body
        try
        {
            const result = await User.findByIdAndUpdate(userId, UpdatedUserdata, { new: true })
             res.status(200).json
            ({
                success : true,
                message : "User updated successfully:",
                data : result
            })
        }
        catch(error)
        {
            res.json
            ({
                success:false,
                message : error.message
            })

        }
    },

    async deleteUser(req, res) 
    {
        const userId = req.params.id;
        try
        {
            await User.findByIdAndDelete(userId)
            res.status(200).json
            ({
            success:true,
            message : "User deleted successfully:",
            })
        }
        catch(error)
        {
            res.json
            ({
                success : false,
                message : error.message
            })

        }
    }
} 
module.exports = UserController