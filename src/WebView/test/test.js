import React from "react";
import { Alert, Button, Text } from "rizzui";
import useAlertController from "../../Hooks/use-alert-controller";

export default function App() {
  const [isOpen, setIsOpen] = React.useState(true);
  const { showCustomAlert } = useAlertController();
  const handleClick = () => {
    showCustomAlert({
      type : 'error',
      name: 'Success',
      message: 'User Details Updated Successfully',
      onClose: () => console.log('Alert closed'), // Optional callback on close
    });
  };

  return (
    <>  
       <button onClick={handleClick}>Show Custom Alert</button>
    </>
  );
}