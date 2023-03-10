//counter currently used for rotary encoder tracking
int counter = 1;
int currentStateCLK;
int lastStateCLK;
String currentDir ="";
unsigned long lastButtonPress = 0;

void initEncoderController(){
  // Set encoder pins as inputs
  pinMode(ENCODER_CLOCK_PIN, INPUT);
  pinMode(ENCODER_DATA_PIN, INPUT);
  pinMode(ENCODER_BUTTON_PIN, INPUT_PULLUP);

  // Read the initial state of CLK
	lastStateCLK = digitalRead(ENCODER_CLOCK_PIN);

  Serial.println("Rotary Encoder and Button initialized.");
}

void fetchEncoderTurnInput(){ //ROTARY ENCODER DETECTION
	// Read the current state of CLK
	currentStateCLK = digitalRead(ENCODER_CLOCK_PIN);

	// If last and current state of CLK are different, then pulse occurred
	// React to only 1 state change to avoid double count
	if (currentStateCLK != lastStateCLK  && currentStateCLK == 1){
    //TODO: make this so it sends input via the state manager.
		// If the DT state is different than the CLK state then
		// the encoder is rotating CCW so decrement
		if (digitalRead(ENCODER_DATA_PIN) != currentStateCLK) {
      if(counter > 1){
        counter --;
      }
			currentDir ="CCW";
		} else {
			if(counter < 15){
        counter ++;
      }
			currentDir ="CW";
		}

		Serial.print(" | Counter: ");
		Serial.println(counter);
	}

	// Remember last CLK state
	lastStateCLK = currentStateCLK;
}

void fetchEncoderButtonInput(){
   //BUTTON DETECTION
	// Read the button state
	int btnState = digitalRead(ENCODER_BUTTON_PIN);

	//If we detect LOW signal, button is pressed
	if (btnState == LOW) {
		//if 50ms have passed since last LOW pulse, it means that the
		//button has been pressed, released and pressed again
		if (millis() - lastButtonPress > 250) {
      Serial.println("Button pressed!");
      //if we are in the READY state, move state to SET
      switch(state){
        case IDLE:
          FastLED.clear();
          state = POMODORO_SET;
          break;
        case POMODORO_SET:
          //start timer
          state = POMODORO_RUN;
          break;
        case POMODORO_RUN:
          state = IDLE;
          break;
        case STATUS_SET:
          Serial.println("Unimplemented State: Status Set");
          break;
        case STATUS_RUN:
          Serial.println("Unimplemented State: Status Run");
          break;
        case STRETCH:
          Serial.println("Unimplemented State: Stretch");
          break;
        case PLAY:
          Serial.println("Unimplemented State: Play");
          break;
        case BT_PAIR:
          Serial.println("Unimplemented State: Bluetooth Pairing");
          break;
        default:
          Serial.println("You ain't supposed to be here, pardner!");
          break;
		  }
		  // Remember last button press event
		  lastButtonPress = millis();
    } 
  }

}