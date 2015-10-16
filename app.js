
var hexplosion = {

	context: null,
	canvas: null,

	// Set everything up
	init: function(canvasObject) {

		// Add the canvas object to the hexGrid object
		this.canvas = canvasObject;

		// Get a drawing context
		this.context = this.canvas.getContext('2d');
	}

};
