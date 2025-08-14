const Customer = require("../Schema/CustomerSchema");
const generateCustomerCode = require('../utility/generateCustomerCode,js');

const path = require("path");
const fs = require("fs");
const { log } = require("console");
const {BASE_URL} = process.env;

exports.addCustomer = async (req, res) => {
  try {
    const customerData = req.body;

    // Handle image path
    if (req.file) {
      const folder = req.file.destination.split("public")[1];
      customerData.photo = `${process.env.BASE_URL}${folder}/${req.file.filename}`.replace(/\\/g, "/");
    }

    // Generate a unique code
    customerData.code = await generateCustomerCode();

    const newCustomer = new Customer(customerData);
    await newCustomer.save();

    return res.status(200).json({ success: true, data: newCustomer });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.allCustomer = async (req, res)=>{
    try {
        const customers = await Customer.find().sort({createdAt: -1});        

        return res.status(200).json({success: true, data: customers})
    } catch (error) {
        return res.status(500).json({success:false, message: error?.message})
    }
}

exports.singleCustomer = async (req, res)=>{
    try {
        const {id} = req.params;
        const customers = await Customer.findById(id);        

        return res.status(200).json({success: true, data: customers})
    } catch (error) {
        return res.status(500).json({success:false, message: error?.message})
    }
}


const deleteFile = (fileUrl, baseUrl) => {
  const filePath = path.join(__dirname, "../public", fileUrl.replace(baseUrl, ""));
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

exports.updateCustomer = async (req, res)=>{
  
  const id = req.body.id;
    try {
    const existingCustomer = await Customer.findById(id);
    if (!existingCustomer) return res.status(404).json({ message: "Customer not found" });

     // Handle image update
      if (req.file) {
     // ✅ Extract relative path after "public"
     const relativePath = req.file.path.split("public")[1].replace(/\\/g, "/");
     const newImageUrl = `${BASE_URL}${relativePath}`;
   
     // ✅ Delete old image if exists
     if (
       existingCustomer.photo &&
       existingCustomer.photo.startsWith(BASE_URL) &&
       fs.existsSync(path.join(__dirname, "../public", existingCustomer.photo.replace(BASE_URL, "")))
     ) {
       deleteFile(existingCustomer.photo, BASE_URL);
     }
   
     req.body.photo = newImageUrl;
   }
   
    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ success: true, data: updatedCustomer });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}




exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).json({ message: "Customer not found" });

    // Delete image from disk
    if (customer.photo) {
      deleteFile(customer.photo); // ⬅️ Call the function
    }

    await Customer.findByIdAndDelete(req.params.id);

    return res.status(200).json({ success: true, message: "Customer deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


exports.deleteCustomer  = async(req, res)=>{
    try {
        const {id} = req.params;
        const deleteCustomer = await Customer.findByIdAndDelete(id);
        
        return res.status(200).json({success: true, message: "deleted", data: deleteCustomer})
    } catch (error) {
        return res.status(500).json({success:false, message: error?.message})
    }
}