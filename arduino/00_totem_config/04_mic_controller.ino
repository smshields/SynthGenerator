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
  
  //how big is the threshold?
  int micValue = abs(rawMicValue - analogBaseline); //absolute distance from baseline
  if(micValue > 10){
    if(millis() - lastMicEvent > 50){
      Serial.println("Tap sound was detected!");
      //TODO: HANDLE TAP INTERACTIONS
    }
    
    lastMicEvent = millis();
  }

  //Add mic value to baseline readings, prevent too high of a value from triggering future presses
  baselineReadings[baselineReadingsCounter] = rawMicValue;

  updateAnalogBaseline();

  //update reading index for rolling average
  baselineReadingsCounter++;
  if(baselineReadingsCounter >= 20){
    baselineReadingsCounter = 0;
  }

  //update state date
  updateMicStateData(analogBaseline, rawMicValue, micValue);
}

void updateAnalogBaseline(){
  int baseline = 0;
  for(int i = 0; i < baselineReadingsSize; i++){
    baseline += baselineReadings[i];
  }
  analogBaseline = baseline / baselineReadingsSize;

}

void updateMicStateData(int temp_analogMicBaseline, int temp_rawMicValue, int temp_micValue){
  //Mic
  _analogMicBaseline = temp_analogMicBaseline; //aMB
  _rawMicValue = temp_rawMicValue; //rMV
  _micSignal = temp_micValue; //mS
}