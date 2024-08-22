import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import { MQTTIP } from '../../Constant/Api/Api';

const MQTTComponent = () => {
  const [message, setMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to the MQTT broker
    const client = mqtt.connect(MQTTIP); // Replace with your broker's WebSocket URL

    client.on('connect', () => {
      console.log('Connected');
      setIsConnected(true);

      // Subscribe to a topic
      client.subscribe('66c603e0369aa1055544e60b/recevieTagInfo', (err) => {
        if (!err) {
          console.log('Subscribed to topic');
        }
      });
    });

    client.on('message', (topic, payload) => {
      console.log(`Received message: ${payload.toString()} on topic: ${topic}`);
      setMessage(payload.toString());
    });

    client.on('error', (err) => {
      console.error('Connection error: ', err);
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div>
      <h1>MQTT Example</h1>
      <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
      <p>Received Message: {message}</p>
    </div>
  );
};

export default MQTTComponent;
