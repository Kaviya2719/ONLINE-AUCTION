import Bid from "./BidModel.js";

export const createBid = async (req, res) => {
    try {
        const { productId, bidAmount } = req.body;
        const userId = req.userData.userId; // Access userId from req.userData

        const newBid = new Bid({ productId, userId, bidAmount });
        const savedBid = await newBid.save();

        res.status(200).json({ message: "Bid placed successfully", bid: savedBid });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const getAllBids = async (req, res) => {
    try {
        const bids = await Bid.find().populate("productId").populate("userId");
        res.status(200).json(bids);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
