import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { carsReducer } from './cars/carsView';
import reservationReducer from './reservation/reserve';
import createCarReducer from './newCar/car';
import deleteCarReducer from './deleteCar/deleteCar';
import { authReducer } from './auth/auth';

const token = localStorage.getItem('token');
const initialState = {
  auth: {
    token: token || null,
    isAuthenticated: !!token,
  },
};

const rootReducer = combineReducers({
  // cars: carsReducer,
  newcar: createCarReducer,
  auth: authReducer,
  delete: deleteCarReducer,
  reservations: reservationReducer,
});

export default configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
