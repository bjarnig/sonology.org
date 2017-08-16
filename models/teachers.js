var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Teacher = new keystone.List('Teacher', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true }
});

Teacher.add({
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
    order: { type: Number }
});

//Teacher.addPattern('standard meta');
Teacher.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%, category|20%';
Teacher.register();