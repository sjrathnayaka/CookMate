import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MealPlansPage from './pages/MealPlansPage';
import './App.css';

function App() {
  const currentUser = {
    id: '123' // Replace with actual user ID
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation component removed */}
        <main className="main-content">
          <Routes>
            <Route 
              path="/meal-plans" 
              element={<MealPlansPage userId={currentUser.id} />} 
            />
            <Route 
              path="/" 
              element={<MealPlansPage userId={currentUser.id} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;