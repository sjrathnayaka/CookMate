import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import MealPlansPage from './pages/MealPlansPage';
import ShoppingListPage from './pages/ShoppingPage';
import Navigation from './components/mealplan/Navigation';
import HomePage from './pages/HomePage';
import './App.css'; 
 
function App() { 
  const currentUser = { 
    id: '123' // Replace with actual user ID 
  }; 
 
  return ( 
    <Router> 
      <div className="App"> 
        <Navigation />
        <main className="main-content"> 
          <Routes> 
            <Route path="/" element={<HomePage />} /> 
            <Route path="/meal-plans" element={<MealPlansPage userId={currentUser.id} />} /> 
            <Route path="/shopping" element={<ShoppingListPage userId={currentUser.id} />} /> 
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes> 
        </main> 
      </div> 
    </Router> 
  ); 
} 
 
export default App;
