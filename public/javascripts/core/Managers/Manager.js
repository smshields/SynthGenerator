/*
  Manager class
  
  The Manager is our core base class from which all other manager classes inherit from.
  It stores the key variables that are needed by most/all managers such as the GameSession instance and p5 instance.
    
  By Eddie Melcer
  Last Updated 5/7/22
*/

import GameSession from "../../game/GameSession.js";


export default class Manager {
  /* Constructor */
  // The constructor initializes our Manager class
  constructor() {
	// Get new GameSession reference in case there is none loaded yet
    this.__gameSession = new GameSession();
  }
  
  /* Getters */
  // GameSession getter
  get gameSession(){
	   return this.__gameSession;
  }
  
  // p5 getter
  get p5(){
	   return this.gameSession.p5;
  }
}