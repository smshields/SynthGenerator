import GameSession from "../GameSession.js";
import { NOTE_INDEX, NOTE_STRINGS } from "../Constants.js";
//create a class that handles keystrokes and converts them into
//played notes from the currently selected synthesizer object

//Available keys are the rightmost 7 keys, with every key above and below being a 
//halfstep above/below the other. 

//TODO: Left 9 keys control octave, stock drums...

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
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.Cs ,NOTE_STRINGS.Cs);
                break;
            case 't': //D#
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.Ds, NOTE_STRINGS.Ds);
                break;
            case 'y': //E#
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.Es, NOTE_STRINGS.Es);
                break;
            case 'u': //F#
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.Fs, NOTE_STRINGS.Fs);
                break;
            case 'i': //G#
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.Gs, NOTE_STRINGS.Gs);
                break;
            case 'o': //A#
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.As, NOTE_STRINGS.As);
                break;
            case 'p': //B#
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.Bs, NOTE_STRINGS.Bs);
                break;

            //naturals    
            case 'f': //C
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.C, NOTE_STRINGS.C);
                break;                
            case 'g': //D
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.D, NOTE_STRINGS.D);
                break;
            case 'h': //E
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.E, NOTE_STRINGS.E);    
                break;
            case 'j': //F
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.F, NOTE_STRINGS.F);    
                break;
            case 'k': //G
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.G, NOTE_STRINGS.G);    
                break;
            case 'l': //A
                 this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.A, NOTE_STRINGS.A);  
                break;
            case ';': //B
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.B, NOTE_STRINGS.B);
                break;
            
            //flats
            case 'v': //Cb
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.Cf, NOTE_STRINGS.Cf);
                break;
            case 'b': //Db
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.Df, NOTE_STRINGS.Df);
                break;  
            case 'n': //Eb
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.Ef, NOTE_STRINGS.Ef);
                break;
            case 'm': //Fb
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.Ff, NOTE_STRINGS.Ff);
                break;
            case ',': //Gb
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.Gf, NOTE_STRINGS.Gf);
                break;
            case '.': //Ab
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.Af, NOTE_STRINGS.Af);
                break;
            case '/': //Bb
                this.gameSession.synthManager.triggerSynthAttack(NOTE_INDEX.Bf, NOTE_STRINGS.Bf);
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

            case ' ':
                this.gameSession.synthManager.populateChannelsWithSynthVoice();

            default:
                console.log("Key pressed outside of controller: " + key);
        }
    }

    keyReleased(key){
        switch(key){
            //sharps
            case 'r': //C#
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.Cs);
                break;
            case 't': //D#
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.Ds);
                break;
            case 'y': //E#
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.Es);
                break;
            case 'u': //F#
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.Fs);
                break;
            case 'i': //G#
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.Gs);
                break;
            case 'o': //A#
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.As);
                break;
            case 'p': //B#
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.Bs);
                break;

            //naturals    
            case 'f': //C
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.C);
                break;                
            case 'g': //D
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.D);
                break;
            case 'h': //E
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.E);    
                break;
            case 'j': //F
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.F);    
                break;
            case 'k': //G
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.G);    
                break;
            case 'l': //A
                 this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.A);  
                break;
            case ';': //B
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.B);
                break;
            
            //flats
            case 'v': //Cb
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.Cf);
                break;
            case 'b': //Db
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.Df);
                break;  
            case 'n': //Eb
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.Ef);
                break;
            case 'm': //Fb
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.Ff);
                break;
            case ',': //Gb
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.Gf);
                break;
            case '.': //Ab
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.Af);
                break;
            case '/': //Bb
                this.gameSession.synthManager.triggerSynthRelease(NOTE_INDEX.Bf);
                break;

            default:
                console.log("Key released outside of controller: " + key);
        }
    }

    get gameSession(){
        return this.__gameSession;
    }

    set gameSession(gameSession){
        this.__gameSession = gameSession;
    }

}