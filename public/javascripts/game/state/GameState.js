import State from "../../core/State.js";

/** Example of Gamestate
 * 
 *  1. Renders a background
 *  2. Takes poseLandmarks and renders a skeleton
 *  3. Loads relevant game items (charge pack, etc.)
 *  4. Goes through 4 poses
 *  5. Transition to game over
 * 
 * Alt: Game over on empty charge pack for 5 seconds
 */

export default class GameState extends State {

    // enum Instrument {
    //     AM_SYNTH,
    //     FM_SYNTH,
    //     MEMBRANE_SYNTH,
    //     NOISE_SYNTH,
    //     PLUCK_SYNTH,
    //     MONO_SYNTH
    // }

    constructor(){
        super("Game");

    }

    setup(){
        super.setup();
        //roll for our instrument
        this.gameSession.synthManager.rollForInstrument();

    }

    render(){
        super.render();

        
    }

    update(){
        super.update();

    }

    cleanup(){
        super.update();
    }


}