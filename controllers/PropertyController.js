
const BookProperty = require("../Schema/PropertyBooking");
const Property = require("../Schema/PropertySchema");
const User = require("../Schema/UserSchema");


//------ Get Properties --------
exports.getProperties = async(req, res) =>{
 try {      
//    console.log("req.user", req.user)
   const result = await Property.find();    

    return res
    .status(200).json({success: true, message:"get data success", data: result})
 } catch (error) {
    return res
    .status(500).json({success:  false, message: error.message})
 }
}

//------ Get Single Properties --------

exports.getSingleProperty = async(req, res) =>{
    try {
        const id =  req.params.id;        
        const result = await Property.findById(id)
       return res
       .status(200).json({success: true, message:"get data success", data: result})
    } catch (error) {
       return res
       .status(500).json({success:  false, message: error.message})
    }
   }

//------ Add Properties --------
exports.addProperty = async(req, res)=>{
   try {
      console.log(req.body , "add product")
      const {userId, ...rest} = req.body;

         const result = await Property.create(rest)
      const updateUser = await User.updateOne({_id: userId}, {
         $push: {
            my_properties: result._id,
         }
        })
  
        console.log(updateUser)
      return res
      .status(200).json({success: true, message: "Add property success", data: result})
   } catch (error) {
      return res
      .status(500).json({success: false, message: error.message})
   }
}

exports.postComment = async (req, res) =>{
   try {
      const id = req.params.id;

      
      const property = await Property.findById(id)
      
      property.comments.push(req.body);
      
       await property.save()
      
      
      return res
      .status(200).json({success: false, message: "Thanks for your feedback", data: "result"})
   } catch (error) {
      return res
      .status(500).json({success: true, message:error.message})
   }      
}
 
//  Booking Property 
 exports.bookingProperty = async(req, res) =>{
   try {
      const id = req.params.id;
      const newBooking = {
         user: req?.body.userId,
         property: id,
         phone: req?.body.phone,
         date: req?.body.date,
        }

      const existingBooking = await BookProperty.findOne({user:req.body.userId, property: id})
     
      if(existingBooking){
         return res.status(400).json({ success: false, message: "You have already booked this property." });
      }
     
      console.log("this is from booking")

      const result =  await BookProperty.create(newBooking)
        
      const updateUser = await User.updateOne({_id: req.body.userId}, {
       $push: {
           booking: result._id,
       }
      })

      console.log(updateUser)
      return res
      .status(200).json({success: false, message: "Thanks for your booking", data: result})
   } catch (error) {
      console.log(error.message)
      return res      
      .status(500).json({success: true, message:error.message})
   }   
}


exports.getAllBookedProperties = async(req, res)=>{
   try {
      console.log("clickd  on booked")
      const result = await BookProperty.find();
      console.log(result)
      return res
      .status(200).json({success: false, message: "Thanks for your booking", data: result})
   } catch (error) {
      return res
      .status(500).json({message: "this is from booked",success: true, message:error.message})
   }
}