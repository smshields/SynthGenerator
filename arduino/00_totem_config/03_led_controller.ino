CRGB leds[NUM_LEDS]; //leds
unsigned long LED_MS_TIMER_INCREMENT = 120000; //add one increment for each additional light selected - 2 min

//used for ready animations
unsigned long tempoTime = 0;

void initLEDController(){

}

//index-safe way of lighting up strip
void updateLEDByIndex(int ledIndex,int r, int g, int b){
  if(ledIndex >= 0 && ledIndex < 15){
    leds[ledIndex].setRGB(r, g, b);
  }
  else {
    Serial.println("Attempted to light LED out of range: " + ledIndex);
  }
}

