import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TrainingMode from './pages/TrainingMode';
import Progress from './pages/Progress';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/training/:mode" element={<TrainingMode />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
