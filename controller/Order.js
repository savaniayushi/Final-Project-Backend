const { Order } = require('../model/Order');

exports.fetchOrdersByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const orders = await Order.find({ user: id });

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.createOrder = async(req, res)=>{
    const order = new Order(req.body)
    try{
        const doc = await order.save();
        res.status(201).json(doc)
    }catch(err){
        res.status(400).json(err);

    }
}

exports.deleteOrder = async(req, res)=>{
  const {id} = req.params;
  try{
      const order = await Order.findByIdAndDelete(id)
      res.status(200).json(order)
  }catch(err){
      res.status(400).json(err);

  }
}

exports.updateOrder = async(req, res)=>{
  const {id} = req.params;

  try{
      const order = await Order.findByIdAndUpdate(id, req.body,{new:true});
      res.status(200).json(order)
  }catch(err){
      res.status(400).json(err);

  }
}

exports.fetchAllOrders = async(req, res)=>{
  //sort = {_sort:"price",_order:"desc"}
  // pagination = {_page:1,_limit:10}  //_page=1&_limit=10
  
    let query = Order.find({deleted:{$ne:true}});
    let totalOrdersQuery = Order.find({deleted:{$ne:true}});

    if(req.query._sort && req.query._order){
        query = query.sort({[req.query._sort]:req.query._order});
    }

    const totalDocs = await totalOrdersQuery.countDocuments().exec();
   console.log({totalDocs});
   

    if(req.query._page && req.query._limit){
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize*(page-1)).limit(pageSize);
    }
   
    try{
        const docs = await query.exec();
        res.set('X-Total-Count', totalDocs);
        res.status(200).json(docs)
    }catch(err){
        res.status(400).json(err);

    }
}
