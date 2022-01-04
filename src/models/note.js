const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");


// 스키마 정의
const noteSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            require: true
        },
        author: {
            type: mongoose.Types.ObjectId,
            ref:'User',
            require: true
        },
        favoriteCount: {
            type: Number,
            default: 0
        },
        favoritedBy: [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }]
    },
    {
        timestamps: true
    }
);

// 스키마와 함께 모델 정의
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;