// Set up the canvas and context
const gridCanvas = $("#backgroundCanvas");
const ctx = gridCanvas[0].getContext("2d");
let cellSize = 100; // Size of each cell
var colCount = Math.ceil($(window).width() / cellSize);
var rowCount = Math.ceil($(window).height() / cellSize);

class Cell {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.opacity = 1; // Start fully opaque
		this.currentlyAnimating = false;
	}

	draw() {
		ctx.fillStyle = hexToRGBA(
			$(":root").css("--main-background-color"),
			this.opacity
		);
		ctx.fillRect(this.x, this.y, cellSize, cellSize);
	}

	flash(duration, callback) {
		if (this.currentlyAnimating) return;
		this.currentlyAnimating = true;
		let direction = -1; // Start by decreasing opacity
		let step = 0.01; // Speed of opacity change

		const interval = setInterval(() => {
			if (direction === -1 && this.opacity > 0.1) {
				this.opacity -= step;
			} else if (direction === 1 && this.opacity < 1) {
				this.opacity += step;
			}

			// Change direction only once when the opacity hits the lower limit
			if (this.opacity <= 0.1 && direction === -1) {
				direction = 1; // Switch to increasing opacity
			}

			// End the animation when opacity returns to 1
			if (this.opacity >= 1 && direction === 1) {
				this.opacity = 1; // Ensure opacity doesn't exceed 1
				this.currentlyAnimating = false;
				clearInterval(interval);
				if (callback) callback();
			}
		}, duration / ((1 / step) * 2)); // Calculate interval timing to complete animation in 'duration' ms
	}
}

function hexToRGBA(hex, opacity) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function createCells() {
	tempCells = [];
	for (let i = 0; i < rowCount; i++) {
		tempCells[i] = [];
		for (let j = 0; j < colCount; j++) {
			tempCells[i][j] = new Cell(j * cellSize, i * cellSize);
		}
	}
	return tempCells;
}
let cells = createCells();

function animateRandomBlob(cells, duration) {
	const centerX = Math.floor(Math.random() * colCount);
	const centerY = Math.floor(Math.random() * rowCount);
	const maxRadius = 5; // Maximum radius of influence for the blob

	const cellsToAnimate = [];

	for (
		let i = Math.max(centerY - maxRadius, 0);
		i <= Math.min(centerY + maxRadius, rowCount - 1);
		i++
	) {
		for (
			let j = Math.max(centerX - maxRadius, 0);
			j <= Math.min(centerX + maxRadius, colCount - 1);
			j++
		) {
			const distance = Math.sqrt((i - centerY) ** 2 + (j - centerX) ** 2);
			if (distance <= maxRadius && Math.random() < Math.exp(-distance / 3)) {
				cellsToAnimate.push(cells[i][j]);
			}
		}
	}

	cellsToAnimate.forEach((cell) =>
		cell.flash(duration, () => {
			// Optional: Reset cell properties or handle post-animation behavior here
			cell.opacity = 1; // Reset opacity if needed
		})
	);
}

// To manage animations:
function startBlobAnimations() {
	animateRandomBlob(cells, 10000); // Animate a blob for 1000 ms
	setTimeout(startBlobAnimations, 2000); // Start a new blob every 2000 ms
}

startBlobAnimations();

function drawFrame() {
	ctx.clearRect(0, 0, gridCanvas.width(), gridCanvas.height());
	cells.forEach((row) => row.forEach((cell) => cell.draw()));
	requestAnimationFrame(() => drawFrame(cells));
}

// Set the canvas size and start the animation
gridCanvas.attr("width", $(window).width());
gridCanvas.attr("height", $(window).height());

requestAnimationFrame(() => drawFrame());

$(window).on("resize", () => {
	gridCanvas.attr("width", $(window).width());
	gridCanvas.attr("height", $(window).height());
	colCount = Math.ceil($(window).width() / cellSize);
	rowCount = Math.ceil($(window).height() / cellSize);
	cells = [];
	cells = createCells(); // Recreate cells with new dimensions
});
