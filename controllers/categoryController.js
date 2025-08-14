const Category = require("../Schema/CategorySchema")

exports.createCategory = async(req, res)=>{
    try {
        const { category, brands } = req.body;

        console.log("ccccc",  req.body);

        // Validate input
        if (!category) {
          return res.status(400).json({
            success: false,
            message: 'Valid category name is required'
          });
        }
    
        // Create new category
        const newCategory = await Category.create({
          category: category,
          brands: brands || []
        });
    
       return res.status(201).json({
          success: true,
          data: newCategory
        });
    } catch (error) {
        return res.status(500).json({success:false, message: error?.message})
    }
}



exports.allCategory = async(req, res)=>{
    
    try {
        const categories = await Category.find();        
        return res.status(200).json({success: true, data: categories})
    } catch (error) {
        return res 
        .status(500).json({success:false, message: error?.message})
    }
}

// Update category
exports.updateCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const { category } = req.body;
                            
      
      const existingCategory = await Category.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });  
      console.log("llll", existingCategory);

      return res.json(existingCategory);
    } catch (err) {
      console.log(err?.message)
     return res.status(400).json({ message: err.message });
    }
  };

  exports.updateBrand = async(req, res)=>{
    
  }

  // Delete category9
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;       
    const deleteCategory = await Category.findByIdAndDelete(id);      
    return res.status(200).json({success: true, data: deleteCategory});
  
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
  

  exports.addBrand = async(req, res)=>{
    try {
        const { id } = req.params;
        const { brand } = req.body;
          
        // Check if the category exists

        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
          return res.status(404).json({ message: "Category not found" });
        }
    
        // Push brand into the array
        const updatedCategory = await Category.findByIdAndUpdate(
          id,
          { $push: { brands: brand } },
          { new: true, runValidators: true }
        );
    
       return res.status(200).json(updatedCategory);
      } catch (error) {
        console.error("Error adding brand:", error);
        res.status(500).json({ message: "Internal server error" });
      }
  }

  exports.removeBrand = async (req, res)=>{
    try {
      const { id } = req.params;      
      const { brand } = req.query;

      console.log("bbbb", brand);
      const existingCategory = await Category.findById(id);
      if (!existingCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      // Push brand into the array
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { $pull: { brands: brand } },
        { new: true, runValidators: true }
      );
  
      return res.status(200).json({success: true, message: "Delete brand", data: updatedCategory});

    } catch (error) {
      console.error("Error adding brand:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Delete product
  exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(id);
      
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };