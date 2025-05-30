const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    subName: {
        type: String,
        required: true,
    },
    subCode: {
        type: String,
        required: true,
    },
    sessions: {
        type: String,
        required: true,
    },
    studentclassName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentclass',
        required: true,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'professor',
    }
}, { timestamps: true });

module.exports = mongoose.model("subject", subjectSchema);