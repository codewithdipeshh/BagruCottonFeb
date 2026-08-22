const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bagru_cotton_products', 
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], 
    transformation: [{ width: 800, height: 1000, crop: 'limit' }], 
  },
});

const reviewStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bagru_cotton_reviews', 
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], 
    transformation: [{ width: 600, height: 600, crop: 'limit' }], 
  },
});

const uploadCloud = multer({ storage: productStorage });
const uploadReviewImages = multer({ storage: reviewStorage });

module.exports = { uploadCloud, uploadReviewImages, cloudinary };