StaticJsonDocument<200> doc; //calculated with 20 values with length 4, plus 40b for errors and string growth
//take a sampling of current game state
//state values to be sent over serial are prefixed with underscore
//and sent as camelcase initials of their full variable name to save space
//convert it into a json object
//write a send string
//TODO: receive something?



//TODO: temp? might as well
//TODO: LED Values? Might be cool effects there

//Takes information we are interested in sending over serial and updates it based off totem's current state.
void updateAndSendSerializedState(){

  doc["bP"] = _buttonPressed;
  doc["cER"] = _clockwiseEncoderRotation;
  doc["cCER"] = _counterClockwiseEncoderRotation;
  //doc["aMB"] = _analogMicBaseline;
  //doc["rMV"] = _rawMicValue;
  doc["mS"] = _micSignal;
  doc["aOX"] = _accelOffsetX;
  doc["aOY"] = _accelOffsetY;
  doc["aX"] = _accelX;
  doc["aY"] = _accelY;
  doc["aZ"] = _accelZ;
  doc["gOX"] = _gyroscopeOffsetX;
  doc["gOY"] = _gyroscopeOffsetY;
  doc["gOZ"] = _gyroscopeOffsetZ;
  doc["gX"] = _gyroscopeX;
  doc["gY"] = _gyroscopeY;
  doc["gZ"] = _gyroscopeZ;
  doc["r"] = _roll;
  doc["p"] = _pitch;
  doc["y"] = _yaw;
  doc["s"] = state;

  serializeJson(doc, Serial);
  Serial.print("\n");

}