#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Fonts/FreeSans9pt7b.h>
#include <SoftwareSerial.h>


Adafruit_SSD1306 display(-1);
String message = "D5uzzcrz4kf23fk";
String currentPassword = "";
bool finished = false;
String rx = "";
bool first = true;
String bluetoothName = "";
int name = 0;
SoftwareSerial ble(7,6);


void printScreen(String text, String progress) {

  // Clear the buffer.
  display.clearDisplay();

  display.setCursor(0,0);
  //               xxxxxxxxxxxxxxxxx"+progress+"x
  display.println("T2-CHARACT......."+progress+"%"); //first line - only 21 chars
  display.drawLine(0,7,120,7,WHITE);

  display.setCursor(0,8);
  display.println(text);

  display.display();
}

void setup()
{
  // initialize with the I2C addr 0x3C
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  currentPassword = "";

 // Display Text
  display.clearDisplay();

  display.setTextSize(1);      // Normal 1:1 pixel scale
  display.setTextColor(WHITE); // Draw white text
  display.cp437(true);         // Use full 256 char 'Code Page 437' font

  // BLE
  ble.begin(9600);

  delay(1000);
  int name = random(1000);
  bluetoothName = "dvid-"+String(name);


  ble.println("AT+IBEA0");
  ble.println("AT+ROLE0");
  ble.println("AT+UUID0xFFE0");
  ble.println("AT+CHAR0xFFE1");
  ble.println("AT+NAME"+bluetoothName);
  ble.println("AT+RESET");

  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);

 // Display Text
  display.clearDisplay();

  display.setTextSize(1);      // Normal 1:1 pixel scale
  display.setTextColor(WHITE); // Draw white text
  display.cp437(true);         // Use full 256 char 'Code Page 437' font

  printScreen("Verbose mode = 1 on 0000ffe1","  0");  
  
}

void loop() {
    ble.println("Password : Cow");
    delay(5000);
    printScreen("Something is leaking on 0000ffe1"," 50");
  }
