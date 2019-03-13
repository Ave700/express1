var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ToDoSchema = new Schema(
    {
        task: {type: String, required: true, max:100},
        due_date: {type: Date}
    }
);

ToDoSchema
.virtual('url')
.get(function() {
    return 'catalog/todo/' +this._id;
});

module.exports = mongoose.model('To Do', ToDoSchema);