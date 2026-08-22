const Product = require("../models/product.model");
const Category = require("../models/category.model");

async function createProduct(productData) {
  try {
    let category = null;
    let categoryInput = productData.category;

    if (categoryInput && typeof categoryInput === "object") {
      categoryInput = categoryInput.name || categoryInput.slug || categoryInput.filterId;
    }

    if (!categoryInput) {
      throw new Error("Category field is missing or empty in product data.");
    }

    const categoryName = categoryInput.trim();
    
    category = await Category.findOne({
      $or: [
        { name: { $regex: new RegExp("^" + categoryName + "$", "i") } },
        { slug: { $regex: new RegExp("^" + categoryName + "$", "i") } }
      ]
    });
    
    if (!category) {
      const generatedSlug = categoryName
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

      category = new Category({
        name: categoryName,
        slug: generatedSlug,
        level: 1,
        parentId: null
      });
      
      await category.save();
    }

    const product = new Product({
      title: productData.title,
      description: productData.description,
      price: productData.price,
      discountedPrice: productData.discountedPrice,
      discountPercent: productData.discountPercent,
      quantity: productData.quantity,
      imageUrl: productData.imageUrl || (Array.isArray(productData.imageUrls) ? productData.imageUrls[0] : ""),
      imageUrls: Array.isArray(productData.imageUrls) ? productData.imageUrls : productData.imageUrl ? [productData.imageUrl] : [],
      category: category._id,
    });

    return await product.save();
  } catch (error) {
    throw new Error(error.message);
  }
} 

async function findProductById(productId) {
  try {
    const product = await Product.findById(productId)
      .populate("category")
      .populate("reviews")
      .populate("ratings");

    if (!product) {
      throw new Error(`Product not found with id: ${productId}`);
    }

    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findAllProducts(queryData = {}) {
  try {
    const { category, minPrice, maxPrice, sort, pageNumber, pageSize, search } = queryData;
    let queryCondition = {};

    if (search) {
      const searchTerms = search.trim().split(/\s+/);
      const searchRegexConditions = searchTerms.map(term => {
        const sanitizedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(sanitizedTerm, "i");
        return {
          $or: [
            { title: regex },
            { description: regex }
          ]
        };
      });

      queryCondition.$and = searchRegexConditions;
    }

    if (category) {
      const matchedCategories = await Category.find({
        $or: [
          { name: { $regex: new RegExp("^" + category + "$", "i") } },
          { slug: { $regex: new RegExp("^" + category + "$", "i") } }
        ]
      });

      if (matchedCategories && matchedCategories.length > 0) {
        const categoryIds = matchedCategories.map(cat => cat._id);
        if (queryCondition.$and) {
          queryCondition.$and.push({ category: { $in: categoryIds } });
        } else {
          queryCondition.category = { $in: categoryIds };
        }
      } else if (!search) {
        return { content: [], currentPage: 1, totalPages: 0 };
      }
    }

    if (minPrice && maxPrice) {
      queryCondition.discountedPrice = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    } else if (minPrice) {
      queryCondition.discountedPrice = { $gte: parseInt(minPrice) };
    } else if (maxPrice) {
      queryCondition.discountedPrice = { $lte: parseInt(maxPrice) };
    }

    let query = Product.find(queryCondition);

    if (sort) {
      const sortOrder = sort === "price_high" ? -1 : 1;
      query = query.sort({ discountedPrice: sortOrder });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const page = parseInt(pageNumber) || 1;
    const limit = parseInt(pageSize) || 12;
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments(queryCondition);

    query = query.skip(skip).limit(limit);
    const products = await query.populate("category").populate("reviews").populate("ratings").lean();

    const totalPages = Math.ceil(totalProducts / limit);

    return {
      content: products,
      currentPage: page,
      totalPages: totalPages
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateProduct(productId, reqData) {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error(`Product not found with id: ${productId}`);
    }

    product.title = reqData.title || product.title;
    product.description = reqData.description || product.description;
    product.price = reqData.price || product.price;
    product.discountedPrice = reqData.discountedPrice || product.discountedPrice;
    product.discountPercent = reqData.discountPercent || product.discountPercent;
    product.quantity = reqData.quantity || product.quantity;
    product.imageUrl = reqData.imageUrl || product.imageUrl;
    
    if (reqData.imageUrls) {
      product.imageUrls = Array.isArray(reqData.imageUrls) ? reqData.imageUrls : [reqData.imageUrls];
    }

    if (reqData.category) {
      const category = await Category.findById(reqData.category);
      if (!category) {
        throw new Error("Category not found");
      }
      product.category = category._id;
    }

    return await product.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteProduct(productId) {
  try {
    const product = await findProductById(productId);
    await Product.findByIdAndDelete(productId);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findProductsByCategory(categoryId) {
  try {
    return await Product.find({ category: categoryId }).populate("category");
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createProduct,
  findProductById,
  findAllProducts,
  updateProduct,
  deleteProduct,
  findProductsByCategory,
};