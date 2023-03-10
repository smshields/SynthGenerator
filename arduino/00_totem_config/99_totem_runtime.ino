void setup() {
	// Setup Serial Monitor
	Serial.begin(9600);

  // Setup Rotary Encoder
  initEncoderController(); 
  // Setup Electret Microphone
  initSoundController();
  // Setup Accellerometer
  initMotionController();
  // LED Setup
  initLEDController();

  //tempo Timer
  tempoTime = millis();

  //initialize state
  state = IDLE;
}

void loop() {
  
  //Fetch all required input information
  fetchEncoderTurnInput(); //encoder turn
  fetchEncoderButtonInput(); //button press
  fetchSoundInput(); //sharp sound
  fetchMotionInput(); //motion input

  //TODO: MODEL/STATE MGMT

  //render based on state
  stateLoop();

  //update serialized state and send
  updateAndSendSerializedState();

  //delay to decrease load
  delay(35);

}

void stateLoop(){
  //Render based on state
  switch(state){
    case IDLE:
      idleStateLoop();
      break;
    case POMODORO_SET:
      pomodoroSetStateLoop();
      break;
    case POMODORO_RUN:
      pomodoroRunStateLoop();
      break;
    case STATUS_SET:
      statusSetStateLoop();
      break;
    case STATUS_RUN:
      statusRunStateLoop();
      break;
    case STRETCH:
      stretchStateLoop();
      break;
    case PLAY:
      playStateLoop();
      break;
    case BT_PAIR:
      btPairStateLoop();
      break;
    default:
      Serial.println("You ain't supposed to be here, pardner!");
      break;
  }
}