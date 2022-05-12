import { createRoot } from 'react-dom/client';

import App from './App';

const rootContainer = document.querySelector('#root');
const root = createRoot(rootContainer as Element);
root.render(<App />);
