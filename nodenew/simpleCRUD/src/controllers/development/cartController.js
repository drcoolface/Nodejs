

const filePath = '/Users/mahesh/developer/Nodeprac/nodenew/simpleCRUD/src/data/carts.json'

const CartController = {

async addToCart (req, res) {
    try {
        const userId = req.params.id; // Assuming this is how you're identifying users
        const { productId, quantity, price } = req.body;
    
        // Read the existing carts from the file
        const existingCarts = await readFile(filePath);
    
        // Find the cart for the given user ID
        let cart = existingCarts.find(cart => cart.userId === userId);
    
        if (cart) {
          // User has a cart, push new item
          cart.items.push({ productId, quantity, price });
        } else {
          // User doesn't have a cart, create one and add it to the existingCarts array
          cart = { userId, items: [{ productId, quantity, price }] };
          existingCarts.push(cart);
        }
    
        // Write the updated carts back to the file
        await writeFile(existingCarts, filePath);
    
        res.json({
          success: true,
          message: "Product added to cart successfully",
        });
      } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ success: false, error: error.message });
      }
},

async getCart (req, res){
    try {
        const userId = req.params.id; // Assuming this is how you're identifying users
    
        // Read the existing carts from the file
        const existingCarts = await readFile(filePath);
    
        // Find the cart for the given user ID
        const cart = existingCarts.find(cart => cart.userId === userId);
    
        if (!cart) {
          return res.json({ success: true, data: [] });
        }
    
        res.json({ success: true, data: cart.items });
      } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ success: false, error: error.message });
      }
    }
}

module.exports  = CartController