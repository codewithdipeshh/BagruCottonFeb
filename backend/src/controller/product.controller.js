const productService = require("../services/product.service");

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(
      req.body
    );

    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const findProductById = async (req, res) => {
  try {
    const product =
      await productService.findProductById(
        req.params.id
      );

    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const findAllProducts = async (req, res) => {
  try {
    const products =
      await productService.findAllProducts(
        req.query
      );

    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product =
      await productService.updateProduct(
        req.params.id,
        req.body
      );

    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(
      req.params.id
    );

    return res.status(200).send({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  findProductById,
  findAllProducts,
  updateProduct,
  deleteProduct,
};