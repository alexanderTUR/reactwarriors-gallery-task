import React from 'react';
import { Alert, Button } from 'react-bootstrap';

const errorAlert = (props) => (
  <Alert variant="danger" className="text-center">
    {props.children}
    <Button
      variant="outline-dark"
      size="sm"
      onClick={() => {
        window.location.reload();
      }}
    >
      Reload Page
    </Button>
  </Alert>
);

export const Error = errorAlert;
