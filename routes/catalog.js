var express = require('express');
var router = express.Router();

var main_controller = require('../controllers/mainController');
var book_rec_controller = require('../controllers/bookrecController');
var to_do_controller = require('../controllers/todoController');

// GET catalog home page.
router.get('/', main_controller.index);

///CALCULATOR ROUTE ///

///TO DO ROUTE ///
router.get('/todo/create', to_do_controller.todo_create_get);

// POST request for creating Bookrecs. 
router.post('/todo/create', to_do_controller.todo_create_post);

// GET request for list of all Bookrecs.
router.get('/todo', to_do_controller.todo_list);

/// BOOKRECS ROUTE ///

// GET request for creating a Bookrecs. NOTE This must come before route that displays Bookrecs (uses id).
router.get('/bookrec/create', book_rec_controller.bookrec_create_get);

// POST request for creating Bookrecs. 
router.post('/bookrec/create', book_rec_controller.bookrec_create_post);

// GET request for list of all Bookrecs.
router.get('/bookrec', book_rec_controller.bookrec_list);

module.exports = router;