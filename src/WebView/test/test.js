import React from "react";
import { Alert, Button, Text } from "rizzui";

export default function App() {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <Button
        color="info"
        onClick={() => setIsOpen(true)}
        className="tracking-wider"
      >
        Info Alert
      </Button>
      {isOpen && (
        <Alert
          color="info"
          variant="flat"
          closable
          onClose={() => setIsOpen(false)}
        >
          <Text className="font-semibold">Alert with info</Text>
          <Text>
            Attention All! We are excited to announce the launch of our new
            product/service.
          </Text>
        </Alert>
      )}
    </>
  );
}