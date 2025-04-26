import React, { useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import MealPlansPage from './pages/MealPlansPage';
import Navigation from './components/mealplan/Navigation';
import HomePage from './pages/HomePage';
import './App.css'; 
 
function App() { 
  useEffect(() => {
    // ⚠️ Temporary setup – set this only once
    localStorage.setItem('token', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpc2h1dGhhcmFueWFAZ21haWwuY29tIiwiZXhwIjoxNzQ1NjgyODcxfQ.jeHi3hVNSW7IuAwEVKdm6EoxfSr8vFhj_Vs9dGW3uIW4CrMIhUFYA6Cu5S5pd_FoxQ1pwX71GYJpSKWSJRUHUQ');  // paste full token here
    localStorage.setItem('userId', '680baf52f95f7444ff432641'); // your real userId
  }, []);

  const currentUser = { 
    id: localStorage.getItem('userId') 
  }; 

  return ( 
    <Router> 
      <div className="App"> 
        <Navigation />
        <main className="main-content"> 
          <Routes> 
            <Route path="/" element={<HomePage />} /> 
            <Route path="/meal-plans" element={<MealPlansPage userId={currentUser.id} />} /> 
            <Route path="*" element={<Navigate to="/" />} />
          </Routes> 
        </main> 
      </div> 
    </Router> 
  ); 
} 
 
export default App;
