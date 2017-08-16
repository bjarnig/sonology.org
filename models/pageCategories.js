var keystone = require('keystone'),
    Types = keystone.Field.Types;

var PageCategory = new keystone.List('PageCategory', {
    autokey: { from: 'name', path: 'key' }
});

PageCategory.add({
    name: { type: String, required: true },
    slug: { type: String, index: true },
    order: { type: Number },
    menu: { type: Boolean }
});

PageCategory.relationship({ ref: 'Page', path: 'category' });
//PageCategory.addPattern('standard meta');
PageCategory.register();