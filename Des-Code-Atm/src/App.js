import { Routes, Route } from 'react-router-dom';

import './App.css';
import Encrypt from './Encrypt/Encrypt';
import Login from './Login';
import MainFunction from './MainFunction/MainFunction';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Encrypt />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainFunction />} />
      </Routes>
    </>
  );
}

export default App;
