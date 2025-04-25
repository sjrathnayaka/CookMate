import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MealPlanForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: new Date(),
    endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000) // Default 7-day plan
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const mealPlanPayload = {
        ...formData,
        startDate: formData.startDate.toISOString().split('T')[0],
        endDate: formData.endDate.toISOString().split('T')[0],
        dayPlans: generateDayPlans(formData.startDate, formData.endDate)
      };
      
      console.log('Submitting meal plan:', mealPlanPayload); // Debug log
      await onSubmit(mealPlanPayload);
    } catch (err) {
      console.error('Submission failed:', err);
      setError(err.message || 'Failed to create meal plan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateDayPlans = (startDate, endDate) => {
    const days = [];
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      days.push({
        date: currentDate.toISOString().split('T')[0],
        mealSlots: [
          { mealType: 'Breakfast', recipeId: null, tried: false },
          { mealType: 'Lunch', recipeId: null, tried: false },
          { mealType: 'Dinner', recipeId: null, tried: false }
        ]
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  return (
    <div className="meal-plan-form">
      <h3>Create New Meal Plan</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Plan Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-group">
          <label>Start Date</label>
          <DatePicker
            selected={formData.startDate}
            onChange={(date) => handleDateChange(date, 'startDate')}
            minDate={new Date()}
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-group">
          <label>End Date</label>
          <DatePicker
            selected={formData.endDate}
            onChange={(date) => handleDateChange(date, 'endDate')}
            minDate={formData.startDate}
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Plan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MealPlanForm;