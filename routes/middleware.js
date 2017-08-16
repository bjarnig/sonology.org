var _ = require('underscore'),
	querystring = require('querystring'),
	keystone = require('keystone'),
	async = require('async');

/**
	Initialises the standard view locals
*/

exports.initLocals = function(req, res, next) {

	var selected = "",
		locals = res.locals,
		navLinks = [{
			label: 'News',
			key: 'blog',
			href: '/news'
		}, {
			label: 'Concerts',
			key: 'concerts',
			href: '/concerts'
		}],
		q = keystone.list('PageCategory').model.find({
			"menu": true
		}).sort({
			order: 'asc'
		});

	locals.user = req.user;

	async.waterfall([

		function(callback) {
			
			// Ghetto routing
			if (req.path.indexOf("/keystone") == 0) {
				callback(null, null);
			}
			else if (req.path.indexOf("/news") == 0) {
				navLinks[0].active = true;
				callback(null, null);
			}else if (req.path.indexOf("/concerts") == 0) {
				navLinks[1].active = true;
				callback(null, null);
			}  
			else if (req.path.indexOf("/pages") == 0) {
				var split = req.path.split("/");
				keystone.list('Page').model.findOne({
					slug: split[split.length - 1]
				}).exec(function(err, page) {
					selected = page.category;
					callback(null, selected);
				});
			} else if (req.path.indexOf("/teachers") == 0) {
				var split = req.path.split("/");
				keystone.list('Teacher').model.findOne({
					slug: split[split.length - 1]
				}).exec(function(err, teacher) {
					selected = teacher._id;
					callback(null, selected);
				});
			} else if (req.path.length > 1) {
				var split = req.path.split("/");
				keystone.list('PageCategory').model.findOne({
					slug: split[split.length - 1]
				}).exec(function(err, page) {

					if(page) {
						selected = page._id;
						callback(null, selected);
					}
					else {
						callback(null, null);
					}
				});
			} else {
				callback(null, null);
			}
		}
	], function(err, selected) {
		q.exec(function(err, result) {
			async.forEach(
				result,
				function(item, callback) {
					var active = false;

					if(item._id.toString() == selected) {
						active = true; 
					}

					navLinks.push({
						label: item.name,
						key: item.key,
						href: '/' + item.key,
						active : active
					});

					callback();
				},
				function(err) {

					if (err) {
						next(err);

					} else {
						locals.navLinks = navLinks;
						locals.user = req.user;
						next();
					}
				}
			);
		});
	});

	// 

	// next();

	// [
	// 	{ label: 'News',		key: 'blog',		href: '/news' },
	// 	{ label: 'History',		key: 'history',		href: '/history' },
	// 	{ label: 'Education',	key: 'education',		href: '/education' },
	// 	{ label: 'Staff',		key: 'staff',		href: '/staff' },
	// 	{ label: 'Alumni',		key: 'alumni',		href: '/alumni' },
	// 	{ label: 'Research',	key: 'research',		href: '/research' },
	// 	{ label: 'Admission',	key: 'admission',		href: '/admission' },
	// 	{ label: 'Downloads',	key: 'downloads',		href: '/downloads' }
	// ];

	// locals.navSubLinks = function(key) {

	// 	if(key === 'blog') {
	// 		return [
	// 		{ label: 'Announcements',		key: 'blog',		href: '/news' },
	// 		{ label: 'Events',		key: 'events',		href: '/news' }]
	// 	}
	// 	else if(key === 'history') {
	// 		return [
	// 		{ label: '1956 - 1960',		key: 'history',		href: '/news' },
	// 		{ label: '1960 - 1964',		key: 'history2',		href: '/news' },
	// 		{ label: '1964 - 1986',		key: 'history3',		href: '/news' }]
	// 	}
	// 	else if(key === 'staff') {
	// 		return [
	// 		{ label: '1956 - 1960',		key: 'staff',		href: '/staff' },
	// 		{ label: '1960 - 1964',		key: 'staff2',		href: '/staff' },
	// 		{ label: '1964 - 1986',		key: 'staff3',		href: '/staff' }]
	// 	}
	// 	else if(key === 'education') {
	// 		return [
	// 		{ label: 'BACHELORS',		key: 'education',		href: '/education' },
	// 		{ label: 'MASTERS',		key: 'education2',		href: '/education' },
	// 		{ label: 'INSTRUMENTS&INTERFACES',		key: 'education3',		href: '/education' },
	// 		{ label: 'COURSE',		key: 'education4',		href: '/education' },
	// 		{ label: 'MINOR',		key: 'education5',		href: '/education' }]
	// 	}	
	// 	else if(key === 'alumni') {
	// 		return [
	// 		{ label: 'BACHELORS ALUMNI',		key: 'alumni',		href: '/alumni' },
	// 		{ label: 'MASTERS ALUMNI',		key: 'alumni2',		href: '/alumni' }]
	// 	}
	// 	else if(key === 'research') {
	// 		return [
	// 		{ label: 'BACHELORS',		key: 'research',		href: '/research' },
	// 		{ label: 'MASTERS',		key: 'research2',		href: '/research' }]
	// 	}
	// 	else if(key === 'admission') {
	// 		return [
	// 		{ label: 'BACHELORS',		key: 'admission',		href: '/admission' },
	// 		{ label: 'MASTERS',		key: 'admission2',		href: '/admission' },
	// 		{ label: 'INSTRUMENTS&INTERFACES',		key: 'admission3',		href: '/admission' },
	// 		{ label: 'COURSE',		key: 'admission4',		href: '/admission' },
	// 		{ label: 'MINOR',		key: 'admission5',		href: '/admission' }]
	// 	}
	// 	else if(key === 'downloads') {
	// 		return [
	// 		]
	// 	}
	// 	return [
	// 	];
	// };

	// locals.user = req.user;

	// next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {

	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};

	res.locals.messages = _.any(flashMessages, function(msgs) {
		return msgs.length
	}) ? flashMessages : false;

	next();

};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {

	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}

}