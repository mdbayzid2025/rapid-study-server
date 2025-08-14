const Product = require("../Schema/ProductsSchema")

const fs = require("fs");
const path = require("path");

const { BASE_URL } = process.env; // make sure BASE_URL is set properly

exports.addProduct = async (req, res) => {
    try {
        const productData = req.body;

        if (req.file) {
            const folder = req.file.destination.split("public")[1]; // ex: /images/products
            productData.image = `${process.env.BASE_URL}${folder}/${req.file.filename}`;
        }


        const newProduct = new Product(req.body);
        await newProduct.save();

        return res.status(200).json({ success: true, data: newProduct })
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message })
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID format'
            });
        }
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
};

exports.allProducts = async (req, res) => {
    try {
        const products = await Product.find();

        return res.status(200).json({ success: true, data: products })
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message })
    }
}

const deleteFile = (fileUrl, baseUrl) => {
  const filePath = path.join(__dirname, "../public", fileUrl.replace(baseUrl, ""));
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.body.id;
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Handle image update
   if (req.file) {
  // ✅ Extract relative path after "public"
  const relativePath = req.file.path.split("public")[1].replace(/\\/g, "/");
  const newImageUrl = `${BASE_URL}${relativePath}`;

  // ✅ Delete old image if exists
  if (
    existingProduct.image &&
    existingProduct.image.startsWith(BASE_URL) &&
    fs.existsSync(path.join(__dirname, "../public", existingProduct.image.replace(BASE_URL, "")))
  ) {
    deleteFile(existingProduct.image, BASE_URL);
  }

  req.body.image = newImageUrl;
}

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "deleted", data: deletedProduct })
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message })
    }
}