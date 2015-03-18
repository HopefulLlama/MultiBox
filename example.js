var multiBox = new MultiBox({name: 'example-multi-box', cssClasses: '', items: ['hello','ya'], duplicate: {allowed: false, ignoreCase: true}, htmlAllowed: false, trim: true});

$(window).load(function() {
	multiBox.generate();
});