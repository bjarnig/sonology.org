var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Variant = new keystone.List('Variant', {
    map: { name: 'title' }
});

Variant.add({
    title: { type: String, required: true },
    type: { type: String, required: false },
    
    upperField1Image: { type: String, required: false },
    upperField1Header: { type: String, required: false },
    upperField1Link: { type: String, required: false },
    upperField1Text: { type: Types.Html, wysiwyg: true, height: 100 },

    upperField2Image: { type: String, required: false },
    upperField2Header: { type: String, required: false },
    upperField2Link: { type: String, required: false },
    upperField2Text: { type: Types.Html, wysiwyg: true, height: 100 },

    upperField3Image: { type: String, required: false },
    upperField3Header: { type: String, required: false },
    upperField3Link: { type: String, required: false },
    upperField3Text: { type: Types.Html, wysiwyg: true, height: 100 },

    upperField4Image: { type: String, required: false },
    upperField4Header: { type: String, required: false },
    upperField4Link: { type: String, required: false },
    upperField4Text: { type: Types.Html, wysiwyg: true, height: 100 },

    upperField5Image: { type: String, required: false },
    upperField5Header: { type: String, required: false },
    upperField5Link: { type: String, required: false },
    upperField5Text: { type: Types.Html, wysiwyg: true, height: 100 },

    upperField6Image: { type: String, required: false },
    upperField6Header: { type: String, required: false },
    upperField6Link: { type: String, required: false },
    upperField6Text: { type: Types.Html, wysiwyg: true, height: 100 },


    lowerField1Image: { type: String, required: false },
    lowerField1Header: { type: String, required: false },
    lowerField1Text: { type: Types.Html, wysiwyg: true, height: 100 },

    lowerField2Image: { type: String, required: false },
    lowerField2Header: { type: String, required: false },
    lowerField2Text: { type: Types.Html, wysiwyg: true, height: 100 },
    
    lowerField3Image: { type: String, required: false },
    lowerField3Header: { type: String, required: false },
    lowerField3Text: { type: Types.Html, wysiwyg: true, height: 100 },

    lowerField4Image: { type: String, required: false },
    lowerField4Header: { type: String, required: false },
    lowerField4Text: { type: Types.Html, wysiwyg: true, height: 100 },

    lowerField5Image: { type: String, required: false },
    lowerField5Header: { type: String, required: false },
    lowerField5Text: { type: Types.Html, wysiwyg: true, height: 100 },

    lowerField6Image: { type: String, required: false },
    lowerField6Header: { type: String, required: false },
    lowerField6Text: { type: Types.Html, wysiwyg: true, height: 100 }
});

//Variant.addPattern('standard meta');
Variant.defaultColumns = 'title, type';
Variant.register();
