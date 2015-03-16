var multiBox = new MultiBox({name: 'example-multi-box', cssClasses: '', items: ['hello','ya']});

$(window).load(function() {
	multiBox.generate();
});