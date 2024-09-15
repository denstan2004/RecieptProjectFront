import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import Main from './Main/Main';
const AppRouter = () => {

  return (
    <Router>
      <Routes>
        <Route path={`/main`} element={<Main />} />
        <Route path={`/`} element={<App />} />
        
      </Routes>
    </Router>
  );
};

export default AppRouter;
