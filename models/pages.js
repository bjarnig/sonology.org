var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Page = new keystone.List('Page', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Page.add({
	title: { type: String, required: true },
	slug: { type: String, index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	image: { type: Types.CloudinaryImage },
	content: {
		english: { type: Types.Html, wysiwyg: true, height: 400 },
		dutch: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	category: { type: Types.Relationship, ref: 'PageCategory', many: false },
	order: { type: Number }
});

Page.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

//Page.addPattern('standard meta');
Page.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%, category|20%';
Page.register();
