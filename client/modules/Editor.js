var Editor = {
	canvas: document.getElementById("canvas"),
};

Editor.addNode = function() {
	var Node = require("./Node.js");

	var node = new Node();

	if(Editor.selected) {
		node.setParent(Editor.selected);
	} else {
		node.toBase();
	}

	node.element.classList.add("no-event");

	var move = function(event) {
		node.move(event.offsetX, event.offsetY);
	}

	var place = function(event) {
		Editor.canvas.removeEventListener("mousemove", move);

		document.removeEventListener("mousedown", place);

		node.element.classList.remove("no-event");
	}

	Editor.canvas.addEventListener("mousemove", move);

	document.addEventListener("mousedown", place);
}

Editor.deleteNode = function() {
	if(Editor.selected) {
		Editor.selected.detach();
	}
}

Editor.select = function(node) {
	Editor.deselect();

	node.element.classList.add("selected");

	Editor.selected = node;
}

Editor.deselect = function() {
	if(Editor.selected) {
		Editor.selected.element.classList.remove("selected");

		Editor.selected = null;
	}
}

Editor.init = function() {
	document.getElementById("add-node").addEventListener("click", Editor.addNode);
	document.getElementById("delete-node").addEventListener("click", Editor.deleteNode);

	Editor.canvas.addEventListener("mousedown", Editor.deselect);

	Editor.canvas.addEventListener(
		"mousemove", (e) => document.getElementById("debug-mLoc").textContent = e.offsetX + " " + e.offsetY
	);
}

module.exports = Editor;