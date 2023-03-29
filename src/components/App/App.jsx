import React from 'react';
import logo from '../../images/logo.svg';
import appStyles from './App.module.css';

function App() {
  return (
    <div className={appStyles.App}>
      <header className={appStyles.App__header}>
        <img src={logo} className={appStyles.App__logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
