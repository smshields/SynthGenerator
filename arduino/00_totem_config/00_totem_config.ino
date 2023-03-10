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
#define SOUND_DATA_PIN A15

//State Declaration
enum timerStates{
  IDLE, POMODORO_SET, POMODORO_RUN, STATUS_SET, STATUS_RUN, STRETCH, PLAY, BT_PAIR 
};
enum timerStates state;

