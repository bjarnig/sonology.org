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

				if (!req.params.page) {
					keystone.list('PageCategory').model.find({
						slug: req.route.path.replace('/', '')
					}).exec(function(err, categories) {

						if (categories && categories.length) {

							keystone.list('Page').model.find().where('category', categories[0]._id)
								.sort({
									order: 'asc'
								})
								.exec(function(e, items) {
									if (items) {
										locals.page = items[0].slug;
										callback(null, items[0]);
									} else {
										callback('no items found');
									}
								});
						} else {
							callback('no items found');
						}
					})
				} else {
					locals.page = req.params.page;
					keystone.list('Page').model.findOne({
						state: 'published',
						slug: req.params.page
					}).exec(function(err, result) {
						callback(null, result);
					});
				}
			}, // 
			function(result, callback) {
				if (result && result.category) {

					keystone.list('PageCategory').model.findOne({
						_id: result.category
					}).exec(function(e, item) {

						if (item) {
							locals.data.pageCategory = item.name;
						}
						else {
							locals.data.pageCategory = "";
						}

						callback(null, result);
					});
				} else {
					callback(null, result);
				}
			}
		], function(err, result) {

			if (err) {
				next(err);
			} else {

				locals.data.page = result;

				if (result && result.category) {

					keystone.list('Page').model.find({
						category: result.category
					}).sort({
						order: 'asc'
					}).exec(function(e, items) {

						var menuItems = [];

						async.forEach(
							items,
							function(item, callback) {

								menuItems.push({
									label: item.title,
									key: item.slug,
									href: '/pages/' + item.slug
								});
								callback();
							},
							function(err) {
								if (err) {
									next(err);
								} else {
									locals.navSubLinks = function() {
										return menuItems
									};
									next();
								}
							}
						);
					});
				} else {
					locals.navSubLinks = function() {
						return []
					};
					next(err);
				}
			}
		});
	});

	view.render('page', {
		section: 'page'
	});
}