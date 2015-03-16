var multiBox = new MultiBox({name: 'example-multi-box', cssClasses: '', items: ['hello','ya'], duplicatesAllowed: false, trim: true});

$(window).load(function() {
	multiBox.generate();
});