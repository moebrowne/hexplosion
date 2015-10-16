
var hexplosion = {

	context: null,
	canvas: null,

	// Set everything up
	init: function(canvasObject) {

		// Add the canvas object to the hexGrid object
		this.canvas = canvasObject;

		// Get a drawing context
		this.context = this.canvas.getContext('2d');
	},

	/**
	 * Draw a hexagon onto the canvas
	 *
	 * @param ctx
	 * @param x
	 * @param y
	 * @param radius
	 */
	drawHexagon: function (ctx, x, y, radius) {
		var a = (Math.PI * 2)/6;
		this.context.beginPath();
		this.context.translate(x,y);
		this.context.moveTo(radius,0);
		for (var i = 1; i < 6; i++) {
			this.context.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
		}
		this.context.closePath();
		this.context.stroke();
	},

	explode: function() {

		this.drawHexagon(this.context,100,100,8);
	}

};
