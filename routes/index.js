var _ = require('underscore'),
	keystone = require('keystone'),
	middleware = require('./middleware'),
	importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {
	
	// Views
	app.get('/', routes.views.index);
	app.get('/articles/:category?', routes.views.blog);
	app.get('/blog', routes.views.blog);
	app.get('/news', routes.views.blog);
	app.get('/history', routes.views.page);
	app.get('/education', routes.views.page);
	app.get('/staff', routes.views.page);
	app.get('/alumni', routes.views.page);
	app.get('/research', routes.views.page);
	app.get('/admission', routes.views.page);
	app.get('/downloads', routes.views.page);
	app.get('/concerts', routes.views.concerts);
	app.get('/news/:post', routes.views.post);
	app.get('/pages/:page', routes.views.page);
	app.get('/gallery', routes.views.gallery);
	app.get('/teachers/:teacher', routes.views.teacher);
	app.get('/NL/SOmain.html', routes.views.index);
	app.all('/contact', routes.views.contact);
	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
}