CRGB leds[NUM_LEDS]; //leds
unsigned long LED_MS_TIMER_INCREMENT = 120000; //add one increment for each additional light selected - 2 min

unsigned long IDLE_BASE_HUE = 0;

//used for ready animations
unsigned long idleBaseHueCounter = 0;

unsigned long tempoTime = 0;

void initLEDController(){
  FastLED.addLeds<APA102, LED_DATA_PIN, LED_CLOCK_PIN>(leds, NUM_LEDS);
  //Serial.println("LEDs initialized.");

}

void renderIdleTimer(){
  
  for(int i = 0; i < NUM_LEDS; i++){
    leds[i].setHSV(idleBaseHueCounter, 255, 255);
  }
  idleBaseHueCounter++;
  if(idleBaseHueCounter >= 255){
    idleBaseHueCounter = 0;
  }
  FastLED.show();
}

void renderPomodoroSet(){

  //for 0-35, light up proportionally to top based on current counter


}

void renderPomodoroRun(){
  //for current timer, light up proportionall to top based on set timer

}

//index-safe way of lighting up strip
void updateLEDRGBByIndex(int ledIndex,int r, int g, int b){
  if(ledIndex >= 0 && ledIndex < 15){
    leds[ledIndex].setRGB(r, g, b);
  }
  else {
    //Serial.println("Attempted to light LED out of range: " + ledIndex);
  }
}

//index-safe way of lighting up strip
void updateLEDHSVByIndex(int ledIndex,int h, int s, int v){
  if(ledIndex >= 0 && ledIndex < 15){
    leds[ledIndex].setHSV(h, s, v);
  }
  else {
    //Serial.println("Attempted to light LED out of range: " + ledIndex);
  }
}

