
const { Cart, Order } = require("../../models/model"); 


const OrderController = {
    async checkOut(req, res) {
      try {
    
        const userId = req.params.id;
        const cart = await Cart.findOne({ userId });
        console.log(typeof(userId),"   printed")
        if (!cart || cart.items.length === 0) {
          return res.json({ success: false, message: "Cart is empty" });
        }
        const totalPrice = cart.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        const minimumThreshold = 100;
        if (totalPrice < minimumThreshold) {
          return res.json({
            success: false,
            message: `Total price must be at least $${minimumThreshold} in order to checkout.`,
          });
        }
        //save order to database
        const order = await Order.create({
          userId,
          items: cart.items,
          totalPrice,
          date: new Date(),
        });
        await Cart.findOneAndUpdate({ userId }, { items: [] });
    
        res.json({
          success: true,
          message: "Order placed successfully",
          data: order,
        });
      } catch (error) {
        res.json({ success: false, error: error.message });
      }
    },
    
    async getOrders(req,res) 
    {
        const orderId = req.query.id;
        try
        {
            if(orderId)
            {
                const result = await Order.findById(orderId)
                res.status(200).json
                ({
                success:true,
                message : "1 order fetched",
                data : result
                })
            }
            else
            {
                const result = await Order.find();
                res.status(200).json
                ({
                success:true,
                message : `${result.length} orders fetched`,
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
    }
    
module.exports = OrderController;