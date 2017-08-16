var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// Init locals
	locals.section = 'concerts';
	locals.filters = {
		category: req.params.category
	};

	locals.page = {};

	locals.data = {
		posts: [],
		categories: []
	};

	locals.navSubLinks = function() {
										return []
									};
	

	// Load all categories
	view.on('init', function(next) {

		keystone.list('PostCategory').model.find().sort('name').exec(function(err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.categories = results;

			// Load the counts for each category
			async.each(locals.data.categories, function(category, next) {

				keystone.list('Post').model.count().where('category').in([category.id]).exec(function(err, count) {
					category.postCount = count;
					next(err);
				});

			}, function(err) {
				next(err);
			});

		});

	});

	// Load the current category filter
	view.on('init', function(next) {

		// if (req.params.category) {
			keystone.list('PostCategory').model.findOne({
				key: "concerts"
			}).exec(function(err, result) {

				console.log('DEBUG A');
				console.log(JSON.stringify(result));

				locals.data.category = result;
				next(err);
			});
		// } else { 
		// 	next();
		// }
	});

	// Load the posts
	view.on('init', function(next) {

		var q = keystone.list('Post').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author categories');

		if (locals.data.category) {
			q.where('postCategories').in([locals.data.category]);
		}

		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});

	});

	// Render the view
	view.render('concerts');

}