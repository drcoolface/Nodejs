const { Product } = require("../../models/model"); 

const ProductController = {
    async createProduct(req, res) {
        const productData = req.body;
        if (req.file) {
            productData.imageNames = req.files.map(file => file.filename); // Store multiple filenames
        }
        try {
          const product = await Product.create(productData);
          res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
          });
        } catch (error) {
          console.error('Error in creating product:', error);
          res.status(500).json({
            success: false,
            message: error.message
          });
        }
    },

    async getProducts(req,res) 
    {
        const productId = req.query.id;
        try
        {
            if(productId)
            {
                const result = await Product.findById(productId)
                res.status(200).json
                ({
                success:true,
                message : "1 product fetched",
                data : result
                })
            }
            else
            {
                const result = await Product.find();
                res.status(200).json
                ({
                success:true,
                message : `${result.length} products fetched`,
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

    async updateProduct(req, res) 
    {
        const productId = req.params.id;
        const UpdatedProductdata = req.body
        if (req.files) {
            updatedProductData.imageNames = req.files.map(file => file.filename); // Update with multiple filenames
        }
        try
        {
            const result = await Product.findByIdAndUpdate(productId, UpdatedProductdata, { new: true })
             res.status(200).json
            ({
                success : true,
                message : "Product updated successfully:",
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

    async deleteProduct(req, res) 
    {
        const productId = req.params.id;
        try
        {
            await Product.findByIdAndDelete(productId)
            res.status(200).json
            ({
            success:true,
            message : "Product deleted successfully:",
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
    },

    async updateQuantity(req, res) {
        const productId = req.params.id; // Assuming the ID is passed as a URL parameter
        const { quantity } = req.body; // Extracting new quantity from request body
    
        try {
            // Update the product's quantity using the findByIdAndUpdate method
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                { $set: { quantity: quantity } }, // Only update the quantity field
                { new: true } // Return the updated document
            );
    
            // Check if the product was found and updated
            if(updatedProduct) {
                res.status(200).json({
                    success: true,
                    message: "Product quantity updated successfully",
                    data: updatedProduct
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }
        } catch (error) {
            console.error('Error in updating product quantity:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    async getOutOfStockProducts(req, res) {
        try {
            // Find products where the quantity is less than 5
            const outOfStockProducts = await Product.find({ quantity: { $lt: 5 } });
    
            if (outOfStockProducts.length > 0) {
                res.status(200).json({
                    success: true,
                    message: "Out of stock products fetched successfully",
                    data: outOfStockProducts
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "No out of stock products found",
                    data: []
                });
            }
        } catch (error) {
            console.error('Error in fetching out of stock products:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    
    async addImagesToProduct(req, res) {
        const productId = req.params.id;
        
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ success: false, message: 'No images were uploaded.' });
        }
    
        const imageNames = req.files.map(file => file.filename);
    
        try {
          // Use $push combined with $each to add multiple images to the product's image array
          const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $push: { imageNames: { $each: imageNames } } },
            { new: true }
          );
    
          if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
          }
    
          res.status(200).json({ success: true, message: "Images added successfully", data: updatedProduct });
        } catch (error) {
          console.error('Error adding images to product:', error);
          res.status(500).json({ success: false, message: error.message });
        }
      }

} 
module.exports = ProductController