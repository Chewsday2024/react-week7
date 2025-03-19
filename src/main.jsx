//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';





import store from './store.jsx';
import router from './router.jsx';





import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/all.scss';



createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  //</StrictMode>,
)
