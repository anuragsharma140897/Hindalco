// src/services/mqttService.js
import mqtt from 'mqtt';
import { MQTTIP } from '../Constant/Api/Api';

class MQTTService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.message = '';
    this.subscribers = {
      onConnect: () => {},
      onMessage: () => {},
      onError: () => {},
    };
  }

  connect() {
    if (this.client) {
      this.client.end();
    }

    this.client = mqtt.connect(MQTTIP);

    this.client.on('connect', () => {
      console.log('Connected');
      this.isConnected = true;
      this.subscribers.onConnect();

      this.client.subscribe('66c603e0369aa1055544e60b/recevieTagInfo', (err) => {
        if (!err) {
          console.log('Subscribed to topic');
        }
      });
    });

    this.client.on('message', (topic, payload) => {
      console.log(`Received message: ${payload.toString()} on topic: ${topic}`);
      this.message = payload.toString();
      this.subscribers.onMessage(this.message);
    });

    this.client.on('error', (err) => {
      console.error('Connection error: ', err);
      this.subscribers.onError(err);
    });
  }

  subscribeToTopic(topic) {
    if (this.client) {
      this.client.subscribe(topic, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${topic}`);
        }
      });
    }
  }

  on(event, callback) {
    if (this.subscribers.hasOwnProperty(event)) {
      this.subscribers[event] = callback;
    }
  }

  disconnect() {
    if (this.client) {
      this.client.end();
      this.isConnected = false;
    }
  }
}

const mqttService = new MQTTService();
export default mqttService;
