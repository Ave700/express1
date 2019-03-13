var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookRecSchema = new Schema(
    {
        title: {type: String, required: true, max:100},
        rating: {type: String, required: true, max: 2},
        summery: {type: String}

    }
);

BookRecSchema
.virtual('url')
.get(function() {
    return 'catalog/bookrec/' +this._id;
});

module.exports = mongoose.model('Book Recommendation', BookRecSchema);