var Todo = require('../models/todo');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');



//Should display book reccomendations
exports.todo_list = function(req,res,next) {

    Todo.find()
    .sort([['due_date', 'ascending']])
    .exec(function (err,list_todos) {
        if(err) {return next(err); }
        res.render('todo_list', {title: 'To Do List (this dynamically pulls data from server)', todo_list : list_todos});
    });
};

// Display Author create form on GET.
exports.todo_create_get = function(req, res, next) {       
    res.render('todo_form', { task: 'Create To Do task'});
};


//Should allow book reccomendation create on Post
exports.todo_create_post = [
    //validate
    body('task').isLength({min:1}).trim().withMessage('Task must be present')
        // .isAlphanumeric().withMessage('Must be alphanumeric')
        ,
   
    

    //sanitize
    sanitizeBody('task').trim().escape(),
   
  
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('todo_form', { task: 'Create To Do', todo: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create a rec object with escaped and trimmed data.
            var todo = new Todo(
                {
                    task: req.body.task,
                    due_date: req.body.due_date,
                });
            todo.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new reccomdetation record.
                res.redirect('/catalog/todo');
            });
        }
    }
]

