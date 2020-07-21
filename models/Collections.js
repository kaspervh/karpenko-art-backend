const mongoose = require('mongoose');

const CollectionsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Collections', CollectionsSchema);