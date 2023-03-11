//LED Library
#include <FastLED.h>

//Accellerometer Libraries
#include <Adafruit_MPU6050.h>

//json serialization Library
#include <ArduinoJson.h>

//Rotary Encoder Inputs
#define ENCODER_CLOCK_PIN 49
#define ENCODER_BUTTON_PIN 46
#define ENCODER_DATA_PIN 48

//LED Strip Definition
#define NUM_LEDS 15
#define LED_DATA_PIN 52
#define LED_CLOCK_PIN 53

//Sound Sensor Definition - Analog
#define SOUND_DATA_PIN A14

//State Declaration
enum timerStates{
  IDLE, POMODORO_SET, POMODORO_RUN, STATUS_SET, STATUS_RUN, STRETCH, PLAY, BT_PAIR 
};
enum timerStates state;

//_ INDICATES A STATE VALUE - REPRESENTS REAL-TIME INPUT
//Encoder
bool _buttonPressed = false; //bP
bool _clockwiseEncoderRotation = false; //cER
bool _counterClockwiseEncoderRotation = false; //cCER

//Mic
int _analogMicBaseline = 0; //aMB
int _rawMicValue = 0; //rMV
int _micSignal = 0; //mS

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