import * as React from 'react';
import './tw_output.css';
import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";


const container = document.getElementById('root')
const root = createRoot(container);
root.render(
  // <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </StrictMode>
)

