var Bookrec = require('../models/bookrec');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


// var async = require('async');

// exports.index = function(req, res) {   
//     res.render('index', { title: 'HomePage', error: err, data: results });
//     // async.parallel({
//     //     // book_count: function(callback) {
//     //     //     Book.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
//     //     // },
//     //     // book_recs_count: function(callback) {
//     //     //     Bookrecs.countDocuments({}, callback);
//     //     // },
//     //     // book_recs_available_count: function(callback) {
//     //     //     Bookrecs.countDocuments({status:'Available'}, callback);
//     //     // },
//     //     // author_count: function(callback) {
//     //     //     Author.countDocuments({}, callback);
//     //     // },
//     //     // genre_count: function(callback) {
//     //     //     Genre.countDocuments({}, callback);
//     //     // }
//     // }, 
//     // function(err, results) {
//     //     res.render('index', { title: 'HomePage', error: err, data: results });
//     // });
// };


//Should display book reccomendations
exports.bookrec_list = function(req,res,next) {

    Bookrec.find()
    .sort([['title', 'ascending']])
    .exec(function (err,list_bookrecs) {
        if(err) {return next(err); }
        res.render('bookrec_list', {title: 'Book Reccomendations', bookrec_list : list_bookrecs});
    });
};

// Display Author create form on GET.
exports.bookrec_create_get = function(req, res, next) {       
    res.render('bookrec_form', { title: 'Create Book Reccomendation'});
};


//Should allow book reccomendation create on Post
exports.bookrec_create_post = [
    //validate
    body('title').isLength({min:1}).trim().withMessage('Title must be present')
        // .isAlphanumeric().withMessage('Must be alphanumeric')
        ,
    body('rating').isLength({min:1}).trim().withMessage('Must specify rating')
        // .isAlphanumeric().withMessage('Must be alphanumeric')
        ,
    body('summery').isLength({min:1}).trim().withMessage('Summery must be present')
    // .isAlphanumeric().withMessage('Must be alphanumeric')
    ,

    //sanitize
    sanitizeBody('title').trim().escape(),
    sanitizeBody('rating').trim().escape(),
    sanitizeBody('summery').trim().escape(),

    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('bookrec_form', { title: 'Create Reccomendation', bookrec: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create a rec object with escaped and trimmed data.
            var bookrec = new Bookrec(
                {
                    title: req.body.title,
                    rating: req.body.rating,
                    summery: req.body.summery,
                    
                });
            bookrec.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new reccomdetation record.
                res.redirect('/catalog/bookrec');
            });
        }
    }
]