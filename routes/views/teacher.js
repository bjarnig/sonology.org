var keystone = require('keystone'),
    Page = keystone.list('Page'),
    async = require('async');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    locals.data = {};

    view.on('init', function(next) {

        async.waterfall([
            function(callback) {

                if (req.params.teacher) {
                    locals.page = req.params.page;
                    keystone.list('Teacher').model.findOne({
                        state: 'published',
                        slug: req.params.teacher
                    }).exec(function(err, result) {
                        callback(null, result);
                    });
                }
            }
        ], function(err, result) {

            if (err) {
                next(err);
            } else {

                locals.data.teacher = result;
                locals.navSubLinks = function() {
                    return []
                };
                next(err);
            }
        });
    });

    view.render('teacher', {
        section: 'teacher'
    });
}