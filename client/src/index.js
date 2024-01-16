import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { IntlProvider } from "react-intl";
import { BrowserRouter } from 'react-router-dom';

import { store } from './store/index';
import App from './App';
import fetchAndLoadMessages from "./multiLanguage/helpers/getMessages";
import { getLanguage } from "./multiLanguage/helpers/useLanguage";


const root = ReactDOM.createRoot(document.getElementById('root'));

const language = getLanguage();
const messages = await fetchAndLoadMessages();

root.render(
  <React.StrictMode>
    <IntlProvider
      locale={language}
      messages={messages[language]}
      onError={(error) => {
        console.log("Error: ", error);
      }}
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </IntlProvider>
  </React.StrictMode>
);
