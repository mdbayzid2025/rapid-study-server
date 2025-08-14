const Order = require("../Schema/OrderSchema")

exports.allOrders = async (req, res) => {
    try {
        const { status } = req.query;
    
        const filter = {};
        if (status === 'rough' || status === 'ladger') {
          filter.status = status;
        }
    
        const orders = await Order.find(filter).sort({ createdAt: -1 });;
        res.json(orders);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
}

exports.getSingleOrder = async (req, res) => {
    const {id} = req.params;
    try {
        const order = await Order.findById(id); // Most recent first

        return res.status(200).json({ success: true, data: order });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// First, define the utility function (can be in a separate file like utils/orderCalculations.js)
const calculateOrderTotals = (items) => {
    const updateItems = items.map(item => {
      return {
        ...item,
        total: ((item.price * item.quantity) - Number(item.discount || 0))
      }
    });
    
    const result = updateItems.reduce(
      (acc, item) => {              
        acc.net_total += item?.total || 0;
        acc.total_discount += Number(item?.discount || 0);                        
        return acc;
      },
      {
        sub_total: 0,
        total_discount: 0,              
        net_total: 0,              
      }
    );
  
    result.sub_total = result.net_total + result.total_discount;
    return { calculatedItems: updateItems, totals: result };
  };
  
  

  // Continue with your saving logic...

exports.createOrder = async (req, res)=>{
    try {
        const {items, ...rest} = req.body;
        
        const { calculatedItems, totals } = calculateOrderTotals(items);

         const order = await Order.find();     
         const invoice_no = String(order?.length + 1).padStart(4, '0');

        const data = {
            ...rest,
            invoice_no,
            order_items: calculatedItems,
            sub_total: totals.sub_total,
            discount: totals.total_discount,
            net_total: totals.net_total,
        }

         const newOrder = new Order(data);
        await newOrder.save();

          
        return res.status(200).json({success: true, message: "order success", data: newOrder})
    } catch (error) {
        return res.status(500).json({success:false, message: error?.message})
    }
}

exports.updateOrder = async (req, res)=>{    
    try {
        const {id} = req.params;
        const order = await Order.findById(id);     
        
        if(!order){
            return res.status(401).json({success: true, message: "customer not exist"});
        }

        const {order_items, ...rest} = req.body;
        const { calculatedItems, totals } = calculateOrderTotals(order_items);

        const updateData = {
            ...rest,            
            order_items: calculatedItems,
            sub_total: totals.sub_total,
            discount: totals.total_discount,
            net_total: totals.net_total,
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {new: true})
        return res.status(200).json({success: true, data: updatedOrder})
    } catch (error) {
        return res.status(500).json({success:false, message: error?.message})
    }
}


exports.deleteOrder  = async(req, res)=>{
    try {
        const {id} = req.params;
        const deleteOrder = await Order.findByIdAndDelete(id);
        return res.status(200).json({success: true, message: "deleted", data: deleteOrder})
    } catch (error) {
        return res.status(500).json({success:false, message: error?.message})
    }
}

exports.updateStatus = async(req, res)  =>{
  try {
    const {id} = req.params;
    // const {status} = req.body;
    const updateOrder = await Order.findByIdAndUpdate(id, req.body, {new: true});

     return res.status(200).json({success: true, message: "Updated", data: updateOrder})
  } catch (error) {
     return res.status(500).json({success:false, message: error?.message})
  }
}