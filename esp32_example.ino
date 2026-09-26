/*
  AgriFuel AI — ESP32 Hardware Example (Future Integration)
  ----------------------------------------------------------
  This sketch is a REFERENCE for how a real ESP32-based farm sensor
  node could eventually send live data to the AgriFuel AI web app.

  It is NOT required to run the hackathon prototype. The web app works
  entirely in DEMO MODE using simulated sensor data — this file exists
  only to show the team's plan for real hardware integration.

  Hardware used in this reference design:
    - ESP32 Dev Board      : Wi-Fi enabled microcontroller, the "brain"
                              of the sensor node.
    - DHT22                : Digital temperature + humidity sensor.
    - Soil Moisture Sensor : Analog capacitive/resistive probe placed
                              in the root zone to estimate soil water
                              content (0-100%).
    - MQ-4                 : Analog gas sensor used here as a rough
                              indicator of methane/biogas-related gas
                              concentration near a biogas digester.
    - Relay Module         : Switches a water pump ON/OFF, controllable
                              remotely from the AgriFuel AI dashboard.

  Data flow (future state):
    ESP32 reads sensors -> formats JSON -> POSTs to a backend endpoint
    -> AgriFuel AI dashboard displays live readings in "Live Mode"
    instead of the current Demo Mode simulation.
*/

#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

// ---------- Wi-Fi configuration (replace with real credentials) ----------
const char* WIFI_SSID = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

// ---------- Backend endpoint (future integration target) ----------
const char* SERVER_URL = "https://your-agrifuel-backend.example.com/api/sensor-data";

// ---------- Pin assignments ----------
#define DHTPIN 4          // DHT22 data pin
#define DHTTYPE DHT22
#define SOIL_MOISTURE_PIN 34   // Analog input for soil moisture probe
#define MQ4_PIN 35             // Analog input for MQ-4 gas sensor
#define RELAY_PIN 26            // Digital output controlling pump relay

DHT dht(DHTPIN, DHTTYPE);
bool pumpStatus = false;

void connectWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected.");
}

// Reads the raw analog soil moisture value and converts it to an
// approximate 0-100% scale. Calibrate LOW/HIGH for your specific probe.
float readSoilMoisturePercent() {
  int raw = analogRead(SOIL_MOISTURE_PIN);
  int dryValue = 3000;  // raw reading in completely dry soil (calibrate)
  int wetValue = 1200;  // raw reading in fully saturated soil (calibrate)
  float percent = 100.0 * (dryValue - raw) / (dryValue - wetValue);
  if (percent < 0) percent = 0;
  if (percent > 100) percent = 100;
  return percent;
}

// Reads the MQ-4 gas sensor as a simple 0-100 relative indicator.
float readGasLevelPercent() {
  int raw = analogRead(MQ4_PIN);
  float percent = (raw / 4095.0) * 100.0;
  return percent;
}

void sendSensorData(float temperature, float humidity, float soilMoisture, float gasLevel) {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  http.begin(SERVER_URL);
  http.addHeader("Content-Type", "application/json");

  String payload = "{";
  payload += "\"temperature\":" + String(temperature, 1) + ",";
  payload += "\"humidity\":" + String(humidity, 1) + ",";
  payload += "\"soilMoisture\":" + String(soilMoisture, 1) + ",";
  payload += "\"gasLevel\":" + String(gasLevel, 1) + ",";
  payload += "\"pumpStatus\":\"" + String(pumpStatus ? "ON" : "OFF") + "\"";
  payload += "}";

  int responseCode = http.POST(payload);
  Serial.printf("POST sensor data -> HTTP %d\n", responseCode);
  http.end();
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW); // pump OFF by default
  dht.begin();
  connectWiFi();
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT22 sensor. Skipping this cycle.");
    delay(3000);
    return;
  }

  float soilMoisture = readSoilMoisturePercent();
  float gasLevel = readGasLevelPercent();

  Serial.printf(
    "Temp: %.1fC  Humidity: %.1f%%  Soil: %.1f%%  Gas: %.1f%%  Pump: %s\n",
    temperature, humidity, soilMoisture, gasLevel, pumpStatus ? "ON" : "OFF"
  );

  sendSensorData(temperature, humidity, soilMoisture, gasLevel);

  // Example: auto-irrigate if soil moisture drops below a threshold.
  // In the real product, pump control would instead be driven remotely
  // by a command fetched from the AgriFuel AI backend.
  if (soilMoisture < 25 && !pumpStatus) {
    pumpStatus = true;
    digitalWrite(RELAY_PIN, HIGH);
  } else if (soilMoisture > 45 && pumpStatus) {
    pumpStatus = false;
    digitalWrite(RELAY_PIN, LOW);
  }

  delay(5000); // read every 5 seconds
}
