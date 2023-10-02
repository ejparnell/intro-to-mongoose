const mongoose = require('mongoose')

const { Schema } = mongoose

const characterSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 1,
        maxLength: 100
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 1,
        maxLength: 100
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    isStarFleet: {
        type: Boolean,
        required: true
    },
    department: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: ['command', 'security', 'medical']
    }
}, {
    timestamps: true
})

characterSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
})