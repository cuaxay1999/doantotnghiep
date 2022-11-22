#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>
 
 
// Thông tin về wifi
#define ssid "mqtt"
#define password "12345678"

// mqtt broker
#define mqtt_server "broker.mqtt-dashboard.com" 
const uint16_t mqtt_port = 1883; //Port của CloudMQTT TCP
 
WiFiClient espClient;
PubSubClient client(espClient);

// Đọc cảm biến nhiệt độ
// GPIO where the DS18B20 is connected to 
const int oneWireBus = 4;     
OneWire oneWire(oneWireBus);
DallasTemperature sensors(&oneWire);


// Hàm chạy chính
void setup() 
{
  Serial.begin(9600);
  sensors.begin();
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port); 
  client.setCallback(callback);
}

// Hàm kết nối wifi
void setup_wifi() 
{
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

// kết nối wifi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}
// Hàm call back để nhận dữ liệu
void callback(char* topic, byte* payload, unsigned int length) 
{
  Serial.print("Co tin nhan moi tu topic:");
  Serial.println(topic);
  for (int i = 0; i < length; i++) 
    Serial.print((char)payload[i]);
  Serial.println();
}
// Hàm reconnect thực hiện kết nối lại khi mất kết nối với MQTT Broker
void reconnect() 
{
  while (!client.connected()) // Chờ tới khi kết nối
  {
    // Thực hiện kết nối với mqtt user và pass
    if (client.connect("ESP8266_wqi_1"))  //kết nối vào broker
    {
      Serial.println("Đã kết nối");
    }
    else 
    {
      Serial.print("Lỗi:, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Đợi 5s
      delay(5000);
    }
  }
}


void loop() 
{
  if (!client.connected()){
    reconnect();
  }

// đcọ nhiệt độ
  sensors.requestTemperatures(); 
  float temperature = sensors.getTempCByIndex(0);

// đọc chỉ số độ đục
  int turbidity = analogRead(A0);
  float vol = turbidity *  5.0 / 1023.0;
  
// convert to string data
  String payload = "1 "; // device id
  payload += vol; // độ đục
  payload += " ";
  payload += temperature; // nhiệt độ

  Serial.println("Send data success");
  Serial.println(payload);

// gửi data lên mqtt server 
  client.publish("WqiConnector", (char*) payload.c_str()); // gửi dữ liệu lên topic ESP8266_sent_data
  delay(5000);
  client.loop();
}