var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    locals = res.locals;
    locals.data = {};

    view.on('init', function(next) {

        keystone.list('Variant').model.findOne({
            "type": "front"
        }).exec(function(e, variant) {

            locals.data.variant = variant;
            next();
        });
    });

    view.render('index', {
        section: 'home'
    });
}