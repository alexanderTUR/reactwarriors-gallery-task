import React from 'react';
import { Spinner } from 'react-bootstrap';

const spinnerLoader = (props) => (
  <Spinner animation="border" variant="secondary" />
);

export const Loader = spinnerLoader;
