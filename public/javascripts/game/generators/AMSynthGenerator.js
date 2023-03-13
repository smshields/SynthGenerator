/** AM Synth Generator
 *  allows the generation of AM Synthesizers with a variety of parameters.
 *
 *  {
harmonicity : 3 ,
detune : 0 ,
oscillator : {
type : sine
}
,
envelope : {
attack : 0.01 ,
decay : 0.01 ,
sustain : 1 ,
release : 0.5
}
,
modulation : {
type : square
}
,
modulationEnvelope : {
attack : 0.5 ,
decay : 0 ,
sustain : 1 ,
release : 0.5
}
}

*/
import { OSCILLATOR_WAVE_TYPE } from "../Constants.js";

export default class AMSynthGenerator{

    constructor(){
        this.__harmonicity = 0; // 0.5 - 2
        this.__detune = 0; // 0 to start - predict this will be hard to use

        //orignal oscilator
        this.__oscillatorType = ""; //sine, square, triangle, sawtooth
        this.__envelopeAttack = 0; //time to rise to attack: 0-1
        this.__envelopeDecay = 0; //time to fall to sustain: 0-1
        this.__envelopeSustain = 0; //percentage: 0-1
        this.__envelopeRelease = 0; //time to fall to silence: 0-1

        //Modulation
        this.__modulationType = ""; //sine, square, triangle, sawtooth
        this.__modulationAttack = 0; //0-1
        this.__modulationDecay = 0; //0-1
        this.__modulationSustain = 0; //0-1
        this.__modulationRelease = 0; //0-1
        
    }

    generateRandomAMSynth(){
        let tempSynth = new Tone.AMSynth(); 
        tempSynth.set({
            harmonicity: this.generateHarmonicity(),
            //detune: this.generateDetune(),
            oscillator: {
                type: this.generateOscillatorType()
            },
            envelope: {
                attack: this.generateEnvelopeAttack(),
                decay: this.generateEnvelopeDecay(),
                sustain: this.generateEnvelopeSustain(),
                release: this.generateEnvelopeRelease()
            },
            // modulationEnvelope:{
            //     attack: this.generateEnvelopeAttack(),
            //     decay: this.generateEnvelopeDecay(),
            //     sustain: this.generateEnvelopeSustain(),
            //     release: this.generateEnvelopeRelease(),
            // }


        });
        

        console.log("reached. ");

        return tempSynth;

    }

    generateHarmonicity(){
        this.harmonicity = Math.random(0,5, 2.0);
        console.log("AM Synth Harmonicity set to: " + this.harmonicity);
        return this.harmonicity;
    }

    generateDetune(){
        this.detune = Math.random(-100, 100);
        console.log("AM Synth Detune set to: " + this.detune);
        return this.detune;
    }

    generateOscillatorType(){
        //sine = 0, square, triangle, sawtooth = 3
        let oscillatorRoll = Math.floor(Math.random() * 4) + 1;
        console.log(oscillatorRoll);
        switch(oscillatorRoll){
            case 1:
                this.oscillatorType = OSCILLATOR_WAVE_TYPE.SINE;
                break;
            case 2:
                this.oscillatorType = OSCILLATOR_WAVE_TYPE.SQUARE;
                break;
            case 3:
                this.oscillatorType = OSCILLATOR_WAVE_TYPE.TRIANGLE;
                break;
            case 4:
                this.oscillatorType = OSCILLATOR_WAVE_TYPE.SAWTOOTH;
                break;
            default:
                console.log("Invalid value rolled for AM Synth Oscillator Type");
                break;
        }
        console.log("AM Synth Oscillator type set to " + this.oscillatorType);
        return this.oscillatorType;
    }

    generateEnvelopeAttack(){
        this.envelopeAttack = Math.random();
        console.log("AM Synth envelope attack set to " + this.envelopeAttack);
        return this.envelopeAttack;
    }

    generateEnvelopeDecay(){
        this.envelopeDecay = Math.random();
        console.log("AM Synth envelope decay set to " + this.envelopeDecay);
        return this.envelopeDecay;
    }

    generateEnvelopeSustain(){
        this.envelopeSustain = Math.random();
        console.log("AM Synth envelope sustain set to " + this.envelopeSustain);
        return this.envelopeSustain;
    }

    generateEnvelopeRelease(){
        this.envelopeRelease = Math.random();
        console.log("AM Synth envelope release set to " + this.envelopeRelease);
        return this.envelopeRelease;
    }

    generateModulationType(){
        //sine = 0, square, triangle, sawtooth = 3
        let modulationRoll = Math.floor(Math.random() * 4) + 1;
        console.log(modulationRoll + " : modulation roll");
        switch(modulationRoll){
            case 1:
                this.modulationType = OSCILLATOR_WAVE_TYPE.SINE;
                break;
            case 2:
                this.modulationType = OSCILLATOR_WAVE_TYPE.SQUARE;
                break;
            case 3:
                this.modulationType = OSCILLATOR_WAVE_TYPE.TRIANGLE;
                break;
            case 4:
                this.modulationType = OSCILLATOR_WAVE_TYPE.SAWTOOTH;
                break;
            default:
                console.log("Invalid value rolled for AM Synth Modulation Type");
                break;
        }
        console.log("AM Synth Oscillator set to " + this.modulationType);
        return this.modulationType;
    }

    generateModulationAttack(){
        this.modulationAttack = Math.random();
        console.log("AM Synth set to " + this.modulationAttack);
        return this.modulationAttack;
    }
    generateModulationDecay(){
        this.modulationDecay = Math.random();
        console.log("AM Synth set to " + this.modulationDecay);
        return this.modulationDecay;
    }
    generateModulationSustain(){
        this.modulationSustain = Math.random();
        console.log("AM Synth set to " + this.modulationSustain);
        return this.modulationSustain;
    }
    generateModulationRelease(){
        this.modulationRelease = Math.random();
        console.log("AM Synth set to " + this.modulationRelease);
        return this.modulationRelease;
    }

    get harmonicity(){
        return this.__harmonicity;
    }

    set harmonicity(harmonicity){
        this.__harmonicity = harmonicity;
    }

    get detune(){
        return this.__detune;
    }

    set detune(detune){
        this.__detune = detune;
    }

    get oscillatorType(){
        return this.__oscillatorType;
    }

    set oscillatorType(type){
        this.__oscillatorType = type;
    }

    get envelopeAttack(){
        return this.__envelopeAttack;
    }

    set envelopeAttack(time){
        this.__envelopeAttack = time;
    }

    get envelopeDecay(){
        return this.__envelopeDecay;
    }

    set envelopeDecay(time){
        this.__envelopeDecay = time;
    }

    get envelopeSustain(){
        return this.__envelopeSustain;
    }

    set envelopeSustain(percentage){
        this.__envelopeSustain = percentage;
    }

    get envelopeRelease(){
        return this.__envelopeRelease;
    }

    set envelopeRelease(time){
        this.__envelopeRelease = time;
    }

    get modulationType(){
        return this.__modulationType;
    }

    set modulationType(type){
        this.__oscillatorType = type;
    }

    get modulationAttack(){
        return this.__modulationAttack;
    }

    set modulationAttack(time){
        this.__modulationAttack = time;
    }

    get modulationDecay(){
        return this.__modulationDecay;
    }

    set modulationDecay(time){
        this.__modulationDecay = time;
    }

    get modulationSustain(){
        return this.__modulationSustain;
    }

    set modulationSustain(percentage){
        this.__modulationSustain = percentage;
    }

    get modulationRelease(){
        return this.__modulationRelease;
    }

    set modulationRelease(time){
        this.__modulationRelease = time;
    }


    
}