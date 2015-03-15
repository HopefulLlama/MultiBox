var $instances = 0;
function MultiBox(name, cssClasses, items) {
	this.instance = $instances;
	$instances++;
	this.name = "multiBox-" + this.instance;
	if (typeof name != 'undefined') {
		this.name = name;
	}

	this.cssClasses = "";
	if (typeof cssClasses != 'undefined') {
		this.cssClasses = cssClasses;
	}

	this.items = [];
	if (typeof items != 'undefined') {
		this.items = items;
	}

	this.addItem = function(item) {
		this.items.push(item);
	};

	this.removeItemByIndex = function(index) {
		console.log(this.items, index);
		this.items.splice(index, 1);
	};

	this.generate = function() {
		var _this = this;
		
		var container = $("#"+this.name);
		container.empty();
		
		container.addClass("panel panel-default");
		var panel = $('<div class="panel-body">');
		panel.appendTo(container);
		
		var listOfItemsDiv = $('<div id="list-of-items-'+this.instance+'">');
		for (var i = 0; i < this.items.length; i++) {
			var item = $('<div class="col-xs-12">');
			item.appendTo(listOfItemsDiv);
			var itemText = $('<span>'+this.items[i]+'</span>');
			itemText.appendTo(item);
			var removeButton = $('<button type="button" class="pull-right btn btn-danger btn-xs" data-item-id="'+i+'">-</button>');
			removeButton.appendTo(item);
			removeButton.click(function(event) {
				_this.removeItemByIndex(parseInt($(event.target).attr('data-item-id')));
				_this.generate();
			});
		}
		listOfItemsDiv.appendTo(panel);

		var footer = $('<div class="panel-footer">');
		footer.appendTo(container);

		var inputGroup = $('<div class="input-group">');
		inputGroup.appendTo(footer);
		var input = $('<input type="text" class="form-control">')
		input.appendTo(inputGroup);
		var inputGroupAddon = $('<span class="input-group-btn">');
		inputGroupAddon.appendTo(inputGroup);
		var addButton = $('<button type="button" class="btn btn-primary">+ Add</button>');
		addButton.appendTo(inputGroupAddon);

		var addItemToList = function() {
			_this.addItem(input.val());
			_this.generate();
		};

		addButton.click(addItemToList);
		input.keydown(function(event) {
			if(event.which == 13) {
				event.preventDefault();
				addItemToList();
			}
		});
	};
}