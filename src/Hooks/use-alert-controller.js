import { useState } from "react";
import { Alert } from "rizzui";

export function useAlertController() {
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: "info", // could be 'success', 'error', 'warning', etc.
    title: "Alert",
    message: "This is an alert message.",
  });

  const openAlert = (type, title, message) => {
    setAlertConfig({
      isOpen: true,
      type: type || "info",
      title: title || "Alert",
      message: message || "This is an alert message.",
    });
  };

  const closeAlert = () => {
    setAlertConfig((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  };

  const AlertComponent = () => (
    alertConfig.isOpen && (
      <Alert
        color={alertConfig.type}
        variant="flat"
        closable
        onClose={closeAlert}
      >
        <span className="font-semibold">{alertConfig.title}</span>
        <span>{alertConfig.message}</span>
      </Alert>
    )
  );

  console.log('alertConfig', alertConfig);

  return {
    alertConfig,
    openAlert,
    closeAlert,
    AlertComponent,
  };
}
