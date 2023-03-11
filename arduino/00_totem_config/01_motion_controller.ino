Adafruit_MPU6050 mpu; //accellerometer

float lastReadTime; //last time we got values from MPU 6050
int numberCalibrationReads = 200; // number of times we read when calculating calibration

//Accellerometer offset
float accelerometerOffsetX = 0;
float accelerometerOffsetY = 0;

//gyroscope offset
float gyroscopeOffsetX = 0;
float gyroscopeOffsetY = 0;
float gyroscopeOffsetZ = 0;

//rotation values
float roll = 0; //x axis
float pitch = 0; //y axis
float yaw = 0; //z axis

void calculateIMUOffset(){
 // Perform numberCalibrationReads from the MPU 6050 and add up the values from each read
  for(int i = 0; i < numberCalibrationReads; i++) {
    // variables to stor sensor values
    sensors_event_t a, g, temp;

    // Reads the accelerometer, gyroscope, and temperature sensor values from the MPU 6050
    mpu.getEvent(&a, &g, &temp);
    
    // Sum the accelerometer readings
    accelerometerOffsetX += ((atan((a.acceleration.y) / sqrt(pow((a.acceleration.x), 2) + pow((a.acceleration.z), 2))) * 180 / PI));
    accelerometerOffsetY += ((atan(-1 * (a.acceleration.x) / sqrt(pow((a.acceleration.y), 2) + pow((a.acceleration.z), 2))) * 180 / PI));

    // Sum the gyroscope readings
    gyroscopeOffsetX += (g.gyro.x);
    gyroscopeOffsetY += (g.gyro.y);
    gyroscopeOffsetZ += (g.gyro.z);
  }
  
  //Divide the sum total of each offset value by numberCalibrationReads to get the average offset value
  accelerometerOffsetX /= numberCalibrationReads;
  accelerometerOffsetY /= numberCalibrationReads;
  gyroscopeOffsetX /= numberCalibrationReads;
  gyroscopeOffsetY /= numberCalibrationReads;
  gyroscopeOffsetZ /= numberCalibrationReads ;

}

void initMotionController(){

  while(!mpu.begin()){
    Serial.println("Looking for MPU6050 chip...");
    delay(1000);
  }
  Serial.println("MPU successfully found and initialized!");

  //Set the accelerometer range - options are 2, 4, 8, 16. Smaller = more sensitive
  mpu.setAccelerometerRange(MPU6050_RANGE_4_G);
  //Set the Gyro range = options are: 250, 500, 1000, 2000. Smaller = more sensitive
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  //Filter bandwidth (TODO: FIGURE OUT WTF THIS IS)
  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);

  //Calculate our resting values (i.e., offsets) for the accellerometer
  calculateIMUOffset();

  lastReadTime = millis();

}

void fetchMotionInput(){
  // Variables to store the sensor values from our MPU 6050
  sensors_event_t a, g, temp;

  // Reads the accelerometer, gyroscope, and temperature sensor values from the MPU 6050  
  mpu.getEvent(&a, &g, &temp);

  // Now calculate how much time has elapsed in seconds since our last read from the MPU 6050
  float elapsedTimeSeconds = (millis() - lastReadTime) / 1000;

  // Update the lastReadTime to now since we just read from the MPU 6050
  lastReadTime = millis();

  // Calculate the x (roll) and y (pitch) orientation angles from the accelerometer data
  float accelerometerAngleX = (atan(a.acceleration.y / sqrt(pow(a.acceleration.x, 2) + pow(a.acceleration.z, 2))) * 180 / PI) - accelerometerOffsetX;
  float accelerometerAngleY = (atan(-1 * a.acceleration.x / sqrt(pow(a.acceleration.y, 2) + pow(a.acceleration.z, 2))) * 180 / PI) - accelerometerOffsetY;

  // Calculate the calibrated gyroscope x, y, and z angles using the offset values we calculated in calculateIMUOffset()
  float gyroscopeAngleX = g.gyro.x - gyroscopeOffsetX;
  float gyroscopeAngleY = g.gyro.y - gyroscopeOffsetY;
  float gyroscopeAngleZ = g.gyro.z - gyroscopeOffsetZ;
  
  // Currently the raw values are in radians per second, so we need to multiply by sendonds to get the angle in radians
  gyroscopeAngleX *= elapsedTimeSeconds;
  gyroscopeAngleY *= elapsedTimeSeconds;

  // Combine acceleromter and gyroscope angle values using what is called a "complementary filter" to calculate current roll and pitch
  roll = -(0.96 * gyroscopeAngleX + 0.04 * accelerometerAngleX) / 2;
  pitch = (0.96 * gyroscopeAngleY + 0.04 * accelerometerAngleY) / 2;

  // We need another sensor that isn't on the MPU 6050 in order to calculate yaw the same way
  // So instead we are just using an approximation by adding the gyroscope z value every loop
  // This works because gyroscopes measure rotational velocity (i.e., rate of change of the angular position over time)
  // So we can just add up these changes over time to estimate where the z orientation is
  yaw += gyroscopeAngleZ * elapsedTimeSeconds;

  //update state data
  updateMotionStateData(
    accelerometerOffsetX,
    accelerometerOffsetY,
    a.acceleration.x,
    a.acceleration.y,
    a.acceleration.z,
    gyroscopeOffsetX,
    gyroscopeOffsetY,
    gyroscopeOffsetZ,
    g.gyro.x,
    g.gyro.y,
    g.gyro.z,
    roll,
    pitch,
    yaw
  );

}

//function to update motion state data from a reading.
void updateMotionStateData(
  float temp_accelOffsetX, //aOX
  float temp_accelOffsetY, //aOY
  float temp_accelX, //aX
  float temp_accelY, //aY
  float temp_accelZ, //aZ
  float temp_gyroscopeOffsetX, //gOX
  float temp_gyroscopeOffsetY, //gOY
  float temp_gyroscopeOffsetZ, //gOZ
  float temp_gyroscopeX, //gX
  float temp_gyroscopeY, //gY
  float temp_gyroscopeZ, //gZ
  int temp_roll, //r
  int temp_pitch, //p
  int temp_yaw //y
){
  _accelOffsetX = (int) (temp_accelOffsetX * 1000);
  _accelOffsetY =  (int) (temp_accelOffsetY * 1000);
  _accelX =  (int) (temp_accelX * 1000);
  _accelY =  (int) (temp_accelY * 1000);
  _accelZ =  (int) (temp_accelZ * 1000);
  _gyroscopeOffsetX =  (int) (temp_gyroscopeOffsetX * 1000);
  _gyroscopeOffsetY =  (int) (temp_gyroscopeOffsetY * 1000);
  _gyroscopeOffsetZ =  (int) (temp_gyroscopeOffsetZ * 1000);
  _gyroscopeX =  (int) (temp_gyroscopeX * 1000);
  _gyroscopeY =  (int) (temp_gyroscopeY * 1000);
  _gyroscopeZ =  (int) (temp_gyroscopeZ * 1000);
  _roll =  (int) (temp_roll * 1000);
  _pitch =  (int) (temp_pitch * 1000);
  _yaw =  (int) (temp_yaw * 1000);
}