import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import MealPlansPage from './pages/MealPlansPage';
import Navigation from './components/mealplan/Navigation';
import HomePage from './pages/HomePage'; // You'll need to create this
import './App.css'; 
 
function App() { 
  const currentUser = { 
    id: '123' // Replace with actual user ID 
  }; 
 
  return ( 
    <Router> 
      <div className="App"> 
        <Navigation /> {/* Add the Navigation component back */}
        <main className="main-content"> 
          <Routes> 
            <Route  
              path="/meal-plans"  
              element={<MealPlansPage userId={currentUser.id} />}  
            /> 
            <Route  
              path="/"  
              element={<HomePage />}  
            /> 
          </Routes> 
        </main> 
      </div> 
    </Router> 
  ); 
} 
 
export default App;