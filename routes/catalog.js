var express = require('express');
var router = express.Router();

// Require controller modules.
// var book_controller = require('../controllers/bookController');
// var author_controller = require('../controllers/authorController');
var main_controller = require('../controllers/mainController');
var book_rec_controller = require('../controllers/bookrecController');

/// BOOKRECS ROUTE ///
// GET catalog home page.
router.get('/', main_controller.index);

// GET request for creating a Bookrecs. NOTE This must come before route that displays Bookrecs (uses id).
router.get('/bookrec/create', book_rec_controller.bookrec_create_get);

// POST request for creating Bookrecs. 
router.post('/bookrec/create', book_rec_controller.bookrec_create_post);

// // // GET request to delete Bookrecs.
// // router.get('/bookrec/:id/delete', book_rec_controller.bookrec_delete_get);

// // POST request to delete Bookrecs.
// router.post('/bookrec/:id/delete', book_rec_controller.bookrec_delete_post);

// // // GET request to update Bookrecs.
// // router.get('/bookrec/:id/update', book_rec_controller.bookrec_update_get);

// // POST request to update Bookrecs.
// router.post('/bookrec/:id/update', book_rec_controller.bookrec_update_post);

// // // GET request for one Bookrecs.
// // router.get('/bookrec/:id', book_rec_controller.bookrec_detail);

// GET request for list of all Bookrecs.
router.get('/bookrec', book_rec_controller.bookrec_list);

module.exports = router;