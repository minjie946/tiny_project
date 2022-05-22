import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app'
import './index.less'

const root:any = createRoot(document.querySelector('#root')!)
root.render(<App/>)
