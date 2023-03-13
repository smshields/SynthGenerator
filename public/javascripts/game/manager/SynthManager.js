//Prototype manager that handles
//synth generation and assignment to different key slots
import Manager from "../../core/Managers/Manager.js";
import AMSynthGenerator from "../generators/AMSynthGenerator.js";
import { SYNTH } from "../Constants.js";

//responsible for playing notes from a given synth. 
//controller outputs octave and note intended to be played along with signals.


export default class SynthManager extends Manager{

    constructor(){
        super();
        //instance variables
        this.__generatedSynth = {}; //tone.js synth object
        this.__generatedSynthInstrumentName = ""; //name of the object we are using
        this.__currentOctave = 4; //number of current octave - selectable by number

        //establish each key as it's own synth instance to allow multiple voices.
        //indexed in three rows, r-p, r-v in a rectangle on a qwerty keybaord.
        this.__synthVoiceChannels = Array.from({ length: 21 });

        //Synthesizer generators
        this.__amSynthGenerator = new AMSynthGenerator();

        //choose an instrument
        this.rollForInstrument();
        //copy instrument to channels
        this.populateChannelsWithSynthVoice();


    }

    //instantiate new synths for each key - allowing individual note
    //triggers and releases
    populateChannelsWithSynthVoice(){
        if(this.generatedSynth == {} || this.generatedSynthInstrumentName == "" ){
            console.log("Attempted to load channels with synthesizer before generating.");
        }
        
        console.log("Instantiating synth channels...");

        for(let i = 0; i < this.synthVoiceChannels.length; i++){

            switch(/**this.generatedSynthInstrumentName*/SYNTH.AM){
                case(SYNTH.AM):
                    console.log("Generating AM Synth.");
                    this.synthVoiceChannels[i] = this.amSynthGenerator.generateRandomAMSynth().toDestination();
                    break;
                case(SYNTH.FM):
                    console.log("Generating FM Synth.");
                    this.synthVoiceChannels[i] = new Tone.FMSynth().toDestination(); 
                    break;
                case(SYNTH.MEMBRANE):
                    console.log("Generating Membrane Synth");
                    this.synthVoiceChannels[i] = new Tone.MembraneSynth().toDestination();
                    break;
                case(SYNTH.NOISE):
                    console.log("Generating Noise Synth");
                    this.synthVoiceChannels[i] = new Tone.NoiseSynth().toDestination();
                    break;
                case(SYNTH.PLUCK):
                    console.log("Generating Pluck Synth");
                    this.synthVoiceChannels[i] = new Tone.PluckSynth().toDestination();
                    break;
                case(SYNTH.MONO):
                    console.log("Generating Mono Synth");
                    this.synthVoiceChannels[i] = new Tone.MonoSynth({
                        oscillator: {
                            type: "square"
                        },
                        envelope: {
                            attack: 0.1
                        }
                    }).toDestination();
                    break;
                default:
                    console.log("Attempted to generate channels without instrument chosen.");
                    break;
            }
        }

    }

    rollForInstrument(){
        //Roll die, choose instrument from 1-6
        let instrumentRoll = this.rollDie(6);
        console.log("Instrument Roll (d6): " + instrumentRoll);

        //Pick instrument based on die
        switch(instrumentRoll){
            //AM_SYNTH
            case(1):
                this.generatedSynthInstrumentName = SYNTH.AM;
                break;
            //FM_SYNTH
            case(2):
                this.generatedSynthInstrumentName = SYNTH.FM;
                break;
            //MEMBRANE
            case(3):
                this.generatedSynthInstrumentName = SYNTH.MEMBRANE;
                break;
            //NOISE
            case(4):
                this.generatedSynthInstrumentName = SYNTH.NOISE;
                break;
            //PLUCK
            case(5):
                this.generatedSynthInstrumentName = SYNTH.PLUCK;
                break;
            //MONO
            case(6):
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

    /**
     * 
     * @param {int} noteIndex - 0-20; tells us which channel to use
     * @param {String} note - tone-friendly string of the note to play 
     */
    triggerSynthAttack(noteIndex, note){
        let noteString = note + this.currentOctave;
        if(this.generatedSynthInstrumentName == SYNTH.NOISE){
            this.synthVoiceChannels[noteIndex].triggerAttack();
        } else {
            console.log(noteString);
            this.synthVoiceChannels[noteIndex].triggerAttack(noteString);
        }
    }

    /**
     * 
     * @param {int} noteIndex - 0-20; tells us which channel to use
     */
    triggerSynthRelease(noteIndex){
        this.synthVoiceChannels[noteIndex].triggerRelease();
    }

    get amSynthGenerator(){
        return this.__amSynthGenerator;
    }

    set amSynthGenerator(generator){
        this.__amSynthGenerator = generator;
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

    get synthVoiceChannels(){
        return this.__synthVoiceChannels;
    }

    set synthVoiceChannels(channels){
        this.__synthVoiceChannels = channels;
    }

}
