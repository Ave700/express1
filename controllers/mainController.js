var Bookrec = require('../models/bookrec');

exports.index = function(req, res) {
    res.render('index', {title: 'Little site of Horrors'});
};