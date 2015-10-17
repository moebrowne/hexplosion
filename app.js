
var hexplosion = {

	context: null,
	canvas: null,

	hexagon: {
		radius: 8,
	},

	// Set everything up
	init: function(canvasObject) {

		// Add the canvas object to the hexGrid object
		this.canvas = canvasObject;

		// Get a drawing context
		this.context = this.canvas.getContext('2d');

		// Add event handlers
		this.canvas.addEventListener('click', this.explode.bind(this));
	},

	/**
	 * Draw a hexagon onto the canvas
	 *
	 * @param x
	 * @param y
	 * @param radius
	 */
	drawHexagon: function (x, y, radius) {
		var a = (Math.PI * 2)/6;
		this.context.beginPath();
		this.context.save();
		this.context.translate(x,y);
		this.context.moveTo(radius,0);
		for (var i = 1; i < 6; i++) {
			this.context.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
		}
		this.context.closePath();
		this.context.restore();
		this.context.fillStyle = '#FFFFFF';
		this.context.fill();
	},

	drawRipple: function(origin, rippleI) {

		// Set the initial ripple orientation
		var angleDeg = 60;

		// Determine the radius of this ripple
		var radius = (this.hexagon.radius * rippleI);

		// Set the origin of the ripple
		var coordX = (origin.x);
		var coordY = (origin.y - (radius*2) + (this.hexagon.radius * 1.5));

		if (rippleI === 1) {
			this.drawHexagon(coordX, coordY, this.hexagon.radius);
			return;
		}

		// Draw each of the faces of the hexagon
		for (var face = 0; face < 6; face++) {

			// Determine the angle of this face
			var angleRad = (angleDeg * (Math.PI / 180));

			// Determine how many little hexagons should be drawn along this face
			var hexNumToDraw = ((radius / this.hexagon.radius) - 1);

			// Draw the face
			for (var i = 0; i < hexNumToDraw; i++) {

				// Calculate the positions of each little triangle
				var hexCoordX = (Math.sin(angleRad) * ((this.hexagon.radius * i) * 2)) + coordX;
				var hexCoordY = (Math.cos(angleRad) * ((this.hexagon.radius * i) * 2)) + coordY;

				// Actually draw it
				this.drawHexagon(hexCoordX, hexCoordY, this.hexagon.radius);
			}

			// Calculate the start position for the next face
			coordX += (Math.sin(angleRad) * ((this.hexagon.radius * (hexNumToDraw)) * 2));
			coordY += (Math.cos(angleRad) * ((this.hexagon.radius * (hexNumToDraw)) * 2));

			// Calculate the angle of the next face
			angleDeg -= 60;
		}
	},

	explode: function(event) {

		var origin  = {
			x: event.offsetX,
			y: event.offsetY
		};

		var that = this;

		that.drawRipple(origin, 1);
		setTimeout(function() {that.drawRipple(origin, 2)}, (100));
		setTimeout(function() {that.drawRipple(origin, 3)}, (200));
		setTimeout(function() {that.drawRipple(origin, 4)}, (300));
		setTimeout(function() {that.drawRipple(origin, 5)}, (400));
		setTimeout(function() {that.drawRipple(origin, 6)}, (500));
		setTimeout(function() {that.drawRipple(origin, 7)}, (600));
		setTimeout(function() {that.drawRipple(origin, 8)}, (700));

	}

};
