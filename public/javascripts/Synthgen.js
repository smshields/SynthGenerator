import GameSession from "./game/GameSession.js";
import GameState from "./game/state/GameState.js";


/**TODOS:
SETUP should be abstracted to be made easier to use.

*/

//Instantiate our Game Session - this will be our parent for all game data.
let gameSession = new GameSession();


//Define how our P5 sketch will look. Treat this as the "Main".
var Synthgen = function (p) {

	//Executed before beginning setup
	p.preload = function() {
		//Load any assets or libraries

	}

	//Executed before draw
	p.setup = function () {

		//Set canvas to browser size
		gameSession.canvasWidth = window.innerWidth;
		gameSession.canvasHeight = window.innerHeight;

		//instantiate canvas and indicate parent div
		var canvas = p.createCanvas(window.innerWidth, window.innerHeight);
		canvas.parent("canvas");

		//save canvas reference to gameSession
		gameSession.canvas = canvas;

		//Instantiate states (which attaches them to the game session)
		let gameState = new GameState();

		//Set initial game state as loading, call setup method
		gameSession.setCurrentState(gameState);

		//Time scale management
		gameSession.timeManager.timeScale = 1;
		gameSession.timeManager.frameRate = 60;
		gameSession.timeManager.start();

		//P5 configurations
		p.frameRate(60);
		p.imageMode(p.CENTER);

	}

	//core update function of the game
	p.draw = function(){

		//Call managers and states to update each frame. 
		gameSession.timeManager.update();
		gameSession.currentState.update();

		//Renders last and from back to front. Clear before going.
		p.clear();
		p.angleMode(p.DEGREES);

		//TODO: Move to individual classes and use an image
		p.background(p.color(gameSession.backgroundColor)); 
		gameSession.particleManager.render();
		gameSession.currentState.render();

	}

	//implement your controls inside of your specific state.
	p.mousePressed = function(){
		//call gameState code here as needed.
	}


    p.keyPressed = function(){
		gameSession.keyboardController.keyPressed(p.key);
		//call gameState code here as needed.
	}

    p.keyReleased = function(){
		gameSession.keyboardController.keyReleased(p.key);
		//call gameState code here as needed.
	}

    p.keyTyped = function(){
		//call gameState code here as needed.
	}

    p.keyIsDown = function(){
		//call gameState code here as needed.
	}

    p.mouseMoved = function(){
		//call gameState code here as needed.
	}

    p.mouseDragged = function(){
		//call gameState code here as needed.
	}

    p.mousePressed = function(){
		//call gameState code here as needed.
	}

    p.mouseReleased = function(){
		if(gameSession.currentState.mouseReleased){
			gameSession.currentState.mouseReleased();
		}
	}

    p.mouseClicked = function(){
		//call gameState code here as needed.
	}

    p.doubleClicked = function(){
		//call gameState code here as needed.
	}

    p.mouseWheel = function(){
		//call gameState code here as needed.
	}

    p.requestPointerLock = function(){
		//call gameState code here as needed.
	}

    p.exitPointerLock = function(){
		//call gameState code here as needed.
	}


	p.getAngle = function(x1, y1, x2, y2) {
		let angle = Math.atan2(y2-y1, x2-x1) * 180 / Math.PI;
		return angle;
	}

	p.windowResized = function () {
		gameSession.canvasWidth = window.innerWidth;
		gameSession.canvasHeight = window.innerHeight;

		p.resizeCanvas(gameSession.canvasWidth, gameSession.canvasHeight);
	}
}

//Instantiate P5 and attach it to our gameSession instance
gameSession.p5 = new p5(Synthgen, 'canvas');

