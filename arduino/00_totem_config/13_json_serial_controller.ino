StaticJsonDocument<200> doc; //calculated with 20 values with length 4, plus 40b for errors and string growth
//take a sampling of current game state
//state values to be sent over serial are prefixed with underscore
//and sent as camelcase initials of their full variable name to save space
//convert it into a json object
//write a send string
//TODO: receive something?

//Encoder
bool _buttonPressed = false; //bP
bool _clockwiseEncoderRotation = false; //cER
bool _counterClockwiseEncoderRotation = false; //cCER

//Mic
int _analogMicBaseline = 0; //aMB
int _rawMicValue = 0; //rMV

//Accelerometer
float _accelOffsetX = 0; //aOX
float _accelOffsetY = 0; //aOY
float _accelX = 0; //aX
float _accelY = 0; //aY
float _accelZ = 0; //aZ
float _gyroscopeOffsetX = 0; //gOX
float _gyroscopeOffsetY = 0; //gOY
float _gyroscopeOffsetZ = 0; //gOZ
float _gyroscopeX = 0; //gX
float _gyroscopeY = 0; //gY
float _gyroscopeZ = 0; //gZ
int _roll = 0; //r
int _pitch = 0; //p
int _yaw = 0; //y

//TODO: temp? might as well
//TODO: LED Values? Might be cool effects there

//Takes information we are interested in sending over serial and updates it based off totem's current state.
void updateAndSendSerializedState(){

  doc["bP"] = _buttonPressed;
  doc["cER"] = _clockwiseEncoderRotation;
  doc["cCER"] = _counterClockwiseEncoderRotation;
  doc["aMB"] = _analogMicBaseline;
  doc["rMV"] = _rawMicValue;
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