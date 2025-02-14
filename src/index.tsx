import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { ColorModeScript } from '@chakra-ui/react';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { defaultStore, preloadStore } from './store/store';

export let store = defaultStore;

preloadStore()
  .then((createdStore: any) => {
    store = createdStore;
  })
  .finally(() => {
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );
    root.render(
      <React.Fragment>
        <ColorModeScript />
        <Provider store={store}>
          <App />
        </Provider>
      </React.Fragment>
    );
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
