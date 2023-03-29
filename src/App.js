import React from 'react-dom';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/aside/sideBar';
import LifeStyle from './components/pages/lifestyle';

function App() {
  return (
    <div>
      <Router>
        <SideBar />
        <Routes>
          <Route path="/lifestyle" exact element={<LifeStyle />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
