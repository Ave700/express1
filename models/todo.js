var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var moment = require('moment');

var TodoSchema = new Schema(
    {
        task: {type: String, required: true, max:100},
        due_date: {type: Date}
    }
);

TodoSchema
.virtual('url')
.get(function() {
    return 'catalog/todo/' +this._id;
});

TodoSchema
.virtual('due_date_formatted')
.get(function () {
  return moment(this.due_date).format('MMMM Do, YYYY');
});

module.exports = mongoose.model('Todo', TodoSchema);