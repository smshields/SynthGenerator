//Prototype manager that handles
//synth generation and assignment to different key slots
import Manager from "../../core/Managers/Manager.js";

//responsible for playing notes from a given synth. 
//controller outputs octave and note intended to be played along with signals.
const SYNTH = {
    AM: "AM_SYNTH",
    FM: "FM_SYNTH",
    MEMBRANE: "MEMBRANE_SYNTH",
    NOISE: "NOISE_SYNTH",
    PLUCK: "PLUCK_SYNTH",
    MONO: "MONO_SYNTH" 
}

export default class SynthManager extends Manager{

    constructor(){
        super();
        //instance variables
        this.__generatedSynth = {}; //tone.js synth object
        this.__generatedSynthInstrumentName = ""; //name of the object we are using
        this.__currentOctave = 4; //number of current octave - selectable by number

        //channel management - key input
        this__channels = {};


    }

    //instantiate new synths for each key - allowing individual note
    //triggers and releases
    populateChannelsWithSynthVoice(SYNTH_NAME, options){
        console.log("Instantiating synth channels...");

        this.channels[''] = ;
        this.channels[''] = ;
        this.channels[''] = ;
        this.channels[''] = ;
        this.channels[''] = ;
        this.channels[''] = ;
        this.channels[''] = ;

        this.channels[''] = ;
        this.channels[''] = ;
        this.channels[''] = ;
        this.channels[''] = ;
        this.channels[''] = ;
        this.channels[''] = ;
        this.channels[''] = ;

        this.channels[''] = ;
        this.channels[''] = ;
        this.channels[''] = ;
        this.channels[''] = ;
        this.channels[''] = ;
        this.channels[''] = ;
        this.channels[''] = ;
    }

    rollForInstrument(){
        //Roll die, choose instrument from 1-6
        let instrumentRoll = this.rollDie(6);
        console.log("Instrument Roll (d6): " + instrumentRoll);

        //Pick instrument based on die
        switch(instrumentRoll){
            //AM_SYNTH
            case(1):
                this.generatedSynth = new Tone.AMSynth().toDestination();
                this.generatedSynthInstrumentName = SYNTH.AM;
                break;
            //FM_SYNTH
            case(2):
                this.generatedSynth = new Tone.FMSynth().toDestination();
                this.generatedSynthInstrumentName = SYNTH.FM;
                break;
            //MEMBRANE
            case(3):
                this.generatedSynth = new Tone.MembraneSynth().toDestination();
                this.generatedSynthInstrumentName = SYNTH.MEMBRANE;
                break;
            //NOISE
            case(4):
                this.generatedSynth = new Tone.NoiseSynth().toDestination();
                this.generatedSynthInstrumentName = SYNTH.NOISE;
                break;
            //PLUCK
            case(5):
                this.generatedSynth = new Tone.PluckSynth().toDestination();
                this.generatedSynthInstrumentName = SYNTH.PLUCK;
                break;
            //MONO
            case(6):
                this.generatedSynth = new Tone.MonoSynth({
                    oscillator: {
                        type: "square"
                    },
                    envelope: {
                        attack: 0.1
                    }
                }).toDestination();
                this.generatedSynthInstrumentName = SYNTH.MONO;
                break;
            default:
                console.log("Instrument roll failed. Somehow?");
                break;
        }
    }

    //TODO: move to static utilities object
    rollDie(diceSize){
        return Math.floor(Math.random() * diceSize) + 1;
    }

    //triggers the attack of the current synth
    triggerSynthAttack(note){
        let noteString = note + this.currentOctave;
        if(this.generatedSynthInstrumentName == SYNTH.NOISE){
            this.generatedSynth.triggerAttack();
        } else {
            this.generatedSynth.triggerAttack(noteString);
        }
    }

    //triggers the release of the current synth
    triggerSynthRelease(){
        this.generatedSynth.triggerRelease();
    }

    get generatedSynth(){
        return this.__generatedSynth;
    }

    set generatedSynth(synth){
        this.__generatedSynth = synth;
    }

    get generatedSynthInstrumentName(){
        return this.__generatedSynthInstrumentName;
    }

    set generatedSynthInstrumentName(name){
        this.__generatedSynthInstrumentName = name;
    }

    get currentOctave(){
        return this.__currentOctave;
    }

    set currentOctave(octaveNum){
        this.__currentOctave = octaveNum;
    }

    get channels(){
        return this.__channels;
    }

    set channels(channels){
        this.__channels = channels;
    }

}
