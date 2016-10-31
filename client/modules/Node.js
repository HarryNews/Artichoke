var SVGSpace = "http://www.w3.org/2000/svg";

var Editor = require("./Editor.js");

var Node = function() {
	this.group = document.createElementNS(SVGSpace, "g");

	this.rTrans = Editor.canvas.createSVGTransform();
	this.rTrans.setRotate(0, 0, 0);
	this.group.transform.baseVal.appendItem(this.rTrans);

	this.tTrans = Editor.canvas.createSVGTransform();
	this.tTrans.setTranslate(0, 0);
	this.group.transform.baseVal.appendItem(this.tTrans);

	this.element = document.createElementNS(SVGSpace, "circle");
	this.element.addEventListener("mousedown", this.mousedown.bind(this));
	this.element.classList.add("node");
	this.group.appendChild(this.element);
};

Node.prototype.toBase = function(x = 0, y = 0) {
	// If this is a base, return
	if(this.isBase()) return this;
	// If this has a parent, make this not have a parent
	this.detach();
	// Move to the specified coordinates and move children accordingly
	this.tTrans.setTranslate(x, y);
	// Attach it to the canvas
	Editor.canvas.appendChild(this.group);

	return this;
};

Node.prototype.setParent = function(parent, angle = 0, distance = 50) {
	// If parent is a descendant of this, throw an error
	if(this.group.contains(parent.group)) {
		console.error("Trying to set a node as a child of its descendant");
		return null;
	}
	// If this has a parent, make this not have a parent
	this.detach();
	// Make parent a parent of this
	this.parent = parent;

	if(!this.line) {
		this.line = document.createElementNS(SVGSpace, "line");
	}

	this.line.setAttribute("x1", -distance);
	this.group.appendChild(this.line);
	
	parent.group.appendChild(this.group);

	// Set this's angle and position according to the function parameters
	this.rTrans.setRotate(angle, 0, 0);
	this.tTrans.setTranslate(distance, 0);
}

Node.prototype.detach = function() {
	if(this.group.parentNode) {
		this.group.parentNode.removeChild(this.group);
	}

	if(Editor.selected === this) {
		Editor.selected = null;
	}

	return this;
}

Node.prototype.move = function(x, y) {
	if(this.isBase()) {
		// If this is a base, move to the specified coordinates and move children accordingly
		this.tTrans.setTranslate(x, y);
	} else {
		// Otherwise make this point towards the parent and rotate children accordingly

		var relMouse = this.parent.toRelativeCoords(x, y);

		var newRotation = Math.atan2(relMouse.y, relMouse.x) * 180 / Math.PI;

		this.rTrans.setRotate(newRotation, 0, 0);
	}
};

Node.prototype.toRelativeCoords = function(x = 0, y = 0) {
	var coords = Editor.canvas.createSVGPoint();

	coords.x = x;
	coords.y = y;

	return coords.matrixTransform(this.group.getCTM().inverse());
}

Node.prototype.isBase = function() {
	// return whether or not this's group is inside a node group
	return this.group.parentNode === Editor.canvas;
}

Node.prototype.mousedown = function(dEvent) {
	dEvent.stopPropagation();
	dEvent.preventDefault();

	var dragCheck = (event) => {
		var dX = event.offsetX - dEvent.offsetX;
		var dY = event.offsetY - dEvent.offsetY;

		if(dX * dX + dY * dY > 25) {
			Editor.deselect();

			Editor.canvas.removeEventListener("mousemove", dragCheck);

			Editor.canvas.addEventListener("mousemove", onDrag);

			document.removeEventListener("mouseup", onSelect);

			document.addEventListener("mouseup", endDrag);
		}
	};
	var onDrag = (event) => {
		// var dX = event.offsetX - dEvent.offsetX;
		// var dY = event.offsetY - dEvent.offsetY;
		this.move(event.offsetX, event.offsetY);
	};
	var endDrag = (event) => {
		Editor.canvas.removeEventListener("mousemove", onDrag);

		document.removeEventListener("mouseup", endDrag);
	};
	var onSelect = (event) => {
		Editor.canvas.removeEventListener("mousemove", dragCheck);

		document.removeEventListener("mouseup", onSelect);

		Editor.select(this);
	};

	Editor.canvas.addEventListener("mousemove", dragCheck);

	document.addEventListener("mouseup", onSelect);
};

module.exports = Node;