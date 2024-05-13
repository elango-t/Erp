const mongoose = require("mongoose");

const studentclassSchema = new mongoose.Schema({
    studentclassName: {
        type: String,
        required: true,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
}, { timestamps: true });

module.exports = mongoose.model("studentclass", studentclassSchema);

