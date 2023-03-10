unsigned long lastMicEvent = 0;

int baselineReadingsSize = 20;
int baselineReadingsCounter = 0;
int baselineReadings[20];
int analogBaseline = 0;

int analogValue = 0;

void initSoundController(){
  pinMode(SOUND_DATA_PIN, INPUT);
  //get an initial reading
  analogBaseline = analogRead(SOUND_DATA_PIN);
  //initialize baseline array
  for(int i = 0; i < baselineReadingsSize; i++){
    baselineReadings[i] = analogBaseline;
  }
  Serial.println("Sound Controller initialized.");

}

void fetchSoundInput(){
  //Read raw mic value
  int rawMicValue = analogRead(SOUND_DATA_PIN);
  
  //determine distance from threshold
  int micValue = abs(rawMicValue - analogBaseline); //absolute distance from baseline
  if(micValue > 15){
    if(millis() - lastMicEvent > 50){
      Serial.println("Tap sound was detected!");
      //TODO: HANDLE TAP INTERACTIONS
    }
    lastMicEvent = millis();
  }

  //Add mic value to baseline readings
  baselineReadings[baselineReadingsCounter] = rawMicValue;
  updateAnalogBaseline();

  //update reading index for rolling average
  baselineReadingsCounter++;
  if(baselineReadingsCounter >= 10){
    baselineReadingsCounter = 0;
  }
}

void updateAnalogBaseline(){
  int baseline = 0;
  for(int i = 0; i < baselineReadingsSize; i++){
    baseline += baselineReadings[i];
  }
  analogBaseline = baseline / baselineReadingsSize;

}