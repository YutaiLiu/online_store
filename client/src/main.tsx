import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/view/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router';
import { router } from './app/routes/Routes.tsx';
import { Provider } from 'react-redux';
import { configureStore } from './app/store/store.ts';

const store = configureStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store} >
     <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
