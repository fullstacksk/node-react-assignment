import logo from './logo.svg';
import './App.css';
import AppRouter from './components/Router';
import { Provider } from 'react-redux'
import {store, persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter} from 'react-router-dom';





function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
