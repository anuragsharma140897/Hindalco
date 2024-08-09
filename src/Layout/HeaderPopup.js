import React from "react";
import { Popover, Button, Avatar, Text } from "rizzui";
import { logOutAuthenticatedUser } from "../Storage/Storage";

export default function HeaderPopup() {

  const handleLogOut = () =>{
    logOutAuthenticatedUser()
    window.location.reload();

  }
  return (
    <Popover enableOverlay placement="bottom-end">
    <Popover.Trigger>
      <div className="w-12 cursor-pointer">
        <Avatar
          name="John Doe"
          initials="MS"
          color="primary"
        />
      </div>
    </Popover.Trigger>
    <Popover.Content>
      {({ setOpen }) => (
        <div className="font-geist">
          <div className="mb-3 flex items-center gap-3">
            <Avatar
              name="John Doe"
              initials="MS"
              color="primary"
            />
            <div>
              <Text className="text-base font-semibold text-gray-900">
                Mohd Shariq Ansari
              </Text>
              <Text className="text-sm text-gray-500">@mohdShariq</Text>
            </div>
          </div>
          <div className="max-w-[240px] text-sm">
            <Text className="text-gray-700">
              Frontend Developer, love to work with @rfid. 🎉{" "}
            </Text>
          </div>
          <Button
            className="mt-4 w-full"
            size="sm"
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </div>
      )}
    </Popover.Content>
  </Popover>
  
  );
}