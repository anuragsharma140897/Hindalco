import React from 'react'
import { Alert, Text } from 'rizzui'

function SucessAlert() {
  return (
    <Alert color="success" variant="flat">
        <Text className="font-semibold">Success Alert</Text>
        <Text>
          Attention All! We are excited to announce the launch of our new
          product/service.
        </Text>
      </Alert>
  )
}

export default SucessAlert