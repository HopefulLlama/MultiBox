var $instances = 0;
function MultiBox(properties) {
	this.instance = $instances;
	$instances++;

	this.name = (typeof properties.name != 'undefined') ? properties.name : "multiBox-" + this.instance;
	this.cssClasses = (typeof properties.cssClasses != 'undefined') ? properties.cssClasses : "";
	this.items = (typeof properties.items != 'undefined') ? properties.items : [];
	this.duplicateAllowed = (typeof properties.duplicateAllowed != 'undefined') ? properties.duplicateAllowed : false;
	this.trim = (typeof properties.trim != 'undefined') ? properties.trim : true;

	this.addItem = function(item) {
		if (this.duplicateAllowed) {
			this.items.push(item);
			return true;
		} else {
			var duplicateFound = false;
			for (var i = 0; i < this.items.length; i++) {
				if (this.items[i] === item) {
					duplicateFound = true;
				}
			}
			if (!duplicateFound) {
				this.items.push(item);
				return true;
			} else {
				return false;
			}
		}
	};

	this.removeItemByIndex = function(index) {
		console.log(this.items, index);
		this.items.splice(index, 1);
	};

	this.generate = function() {
		var _this = this;
		
		var container = $("#"+this.name);
		container.empty();
		
		container.addClass("panel panel-default " + this.cssClasses);
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
			var item = input.val();
			if(_this.trim) {
				item = item.trim();
			}
			if (_this.addItem(item)) {
				_this.generate();
			}
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