var $instances = 0;
function MultiBox(properties) {
	MultiBox.versionNumber = "1.0.1";
	MultiBox.escapeHTML = function(str) {
    	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	};

	this.instance = $instances;
	$instances++;

	this.name = (typeof properties.name != 'undefined') ? properties.name : "multiBox-" + this.instance;
	this.cssClasses = (typeof properties.cssClasses != 'undefined') ? properties.cssClasses : "";
	this.items = (typeof properties.items != 'undefined') ? properties.items : [];
	this.duplicateAllowed = (typeof properties.duplicateAllowed != 'undefined') ? properties.duplicateAllowed : false;
	this.htmlAllowed = (typeof properties.htmlAllowed != 'undefined') ? properties.htmlAllowed : false;
	this.blankItemAllowed = (typeof properties.blankItemAllowed != 'undefined') ? properties.blankItemAllowed : false;
	this.trim = (typeof properties.trim != 'undefined') ? properties.trim : true;

	this.addItem = function(item) {
		if(!this.blankItemAllowed) {
			if(item.trim() === "") {
				return false;
			}
		}
		if(!this.htmlAllowed) {
			item = MultiBox.escapeHTML(item);
		}
		if(this.trim) {
			item = item.trim();
		}
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
		this.items.splice(index, 1);
	};

	this.generate = function() {
		var _this = this;
		
		var container = $("#"+this.name);
		container.empty();
		
		container.addClass("panel panel-default " + this.cssClasses);
		var panel = $('<div class="panel-body">');
		panel.appendTo(container);
		
		var listOfItemsDiv = $('<div id="list-of-items-'+this.instance+'" class="row">');
		for (var i = 0; i < this.items.length; i++) {
			var item = $('<div class="col-xs-12" style="margin-bottom: 5px">');
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
		var clearButton = $('<button type="button" class="btn btn-warning pull-right">Clear All</button>');
		clearButton.appendTo(panel);
		clearButton.click(function(event) {
			_this.items = [];
			_this.generate();
		});

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
			if (_this.addItem(input.val())) {
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