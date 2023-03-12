// SpriteManager
// Container class for images
import Manager from "./Manager.js";

export default class SpriteManager extends Manager {

	constructor() {
		// TODO: create singleton constructor here
		super();
		this.__sprites = [];

	}

	// addSprite, takes parameters: string name, p5 image sprite
	addSprite( name, sprite ) {
		this.__sprites[name] = sprite;
	}

	getSprite( name ) {
		return this.__sprites[name];
		//TODO: add error handling, this is brittle
	}



}