import React from 'react';
import "./App.css"
import Sidebar from './components/Sidebar';
import MainForm from './components/MainForm';
function App() {
  
  return (
    <div>
      <div className='App'>
        <Sidebar/>
        <MainForm/>
      </div>
    </div>

  );
}

export default App;