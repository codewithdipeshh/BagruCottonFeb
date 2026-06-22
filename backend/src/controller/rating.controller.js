const ratingService = require("../services/rating.service");

const createRating = async (req, res) => {
    try {
        const user = req.user;

        const rating =
            await ratingService.createRating(
                req.body,
                user
            );

        return res.status(201).send(rating);

    } catch (error) {
        return res.status(500).send({
            error: error.message,
        });
    }
};

const getAllRating = async (req, res) => {
    try {
        const productId = req.params.productId;

        const ratings =
            await ratingService.getProductRating(
                productId
            );

        return res.status(200).send(ratings);

    } catch (error) {
        return res.status(500).send({
            error: error.message,
        });
    }
};

module.exports = {
    createRating,
    getAllRating,
};