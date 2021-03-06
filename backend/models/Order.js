const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
    },

    orderItems: [
        {
            type: Object,
            required: true,
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "product",
                unique: true,
            },
            qty: {
                type: Number,
                required: true,
            },
            total: {
                type: Number,
                required: true,
            },
            sizes: { type: [String] },
        },
    ],
    shippingPrice: {
        type: Number,
        required: true,
        default: 5.0,
    },

    shipping: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "shipping",
    },
    total: {
        type: Number,
        required: true,
    },
    placedOn: {
        type: Date,
        default: Date.now,
    },
    shipped: {
        type: Boolean,
        required: true,
        default: false,
    },
    tracking: {
        type: String,
    },
});

module.exports = Order = mongoose.model("order", OrderSchema);
