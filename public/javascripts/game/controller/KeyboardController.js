import GameSession from "../GameSession.js";
//create a class that handles keystrokes and converts them into
//played notes from the currently selected synthesizer object

//Available keys are the rightmost 7 keys, with every key above and below being a 
//halfstep above/below the other. 

//TODO: Left 9 keys control octave, stock drums...
const NOTES = {
    C: 1,
    Cs: 2,
    Df: 2,
    D: 3,
    Ds: 4,
    Ef: 4,
    E: 5,
    Es: 6,
    Ff: 5,
    F: 6,
    Fs: 7,
    Gf: 7,
    G: 8,
    Gs: 9,
    Af: 9,
    A: 10,
    As: 11,
    Bf: 11,
    B: 12,
    Bs: 1
}

const NOTE_STRINGS = {
    Cf: "Cb",
    C: "C",
    Cs: "C#",

    Df: "Db",
    D: "D",
    Ds: "D#",

    Ef: "Eb",
    E: "E",
    Es: "E#",

    Ff: "Fb",
    F: "F",
    Fs: "F#",

    Gf: "Gb",
    G: "G",
    Gs: "G#",

    Af: "Ab",
    A: "A",
    As: "A#",

    Bf: "Bb",
    B: "B",
    Bs: "B#"
}

//TODO: We probably need a standard controller class for this.
export default class KeyboardController{

    constructor(){
        this.__gameSession = new GameSession();
    }

    //triggers note attack
    keyPressed(key){

        switch(key){
            //sharps
            case 'r': //C#
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.Cs);
                break;
            case 't': //D#
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.Ds);
                break;
            case 'y': //E#
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.Es);
                break;
            case 'u': //F#
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.Fs);
                break;
            case 'i': //G#
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.Gs);
                break;
            case 'o': //A#
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.As);
                break;
            case 'p': //B#
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.Bs);
                break;

            //naturals    
            case 'f': //C
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.C);
                break;                
            case 'g': //D
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.D);
                break;
            case 'h': //E
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.E);    
                break;
            case 'j': //F
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.F);    
                break;
            case 'k': //G
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.G);    
                break;
            case 'l': //A
                 this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.A);  
                break;
            case ';': //B
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.B);
                break;
            
            //flats
            case 'v': //Cb
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.Cf);
                break;
            case 'b': //Db
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.Df);
                break;  
            case 'n': //Eb
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.Ef);
                break;
            case 'm': //Fb
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.Ff);
                break;
            case ',': //Gb
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.Gf);
                break;
            case '.': //Ab
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.Af);
                break;
            case '/': //Bb
                this.gameSession.synthManager.triggerSynthAttack(NOTE_STRINGS.Bf);
                break;

            case '1':
                this.gameSession.synthManager.currentOctave=1;
                break;
            case '2':
                this.gameSession.synthManager.currentOctave=2;
                break;  
            case '3':
                this.gameSession.synthManager.currentOctave=3;
                break;
            case '4':
                this.gameSession.synthManager.currentOctave=4;
                break;
            case '5':
                this.gameSession.synthManager.currentOctave=5;                
                break;
            case '6':
                this.gameSession.synthManager.currentOctave=6;                
                break;
            case '7':
                this.gameSession.synthManager.currentOctave=7;
                break;
            case '8':
                this.gameSession.synthManager.currentOctave=8;
                break;
            case '9':
                this.gameSession.synthManager.currentOctave=9;
                break;

            default:
                console.log("Key pressed outside of controller: " + key);
        }
    }

    keyReleased(key){
        this.gameSession.synthManager.triggerSynthRelease();
    }

    get gameSession(){
        return this.__gameSession;
    }

    set gameSession(gameSession){
        this.__gameSession = gameSession;
    }

}