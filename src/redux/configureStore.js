import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './user/user';
import { reservationDetailsReducer, reservationReducer, myReservationReducer } from './reservation/reserve';
import fetchCars, { carsReducer } from './cars/car';

const rootReducer = combineReducers({
  user: userReducer,
  reservationReducer,
  myReservation: myReservationReducer,
  reservationDetails: reservationDetailsReducer,
  cars: carsReducer,
});

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

store.dispatch(fetchCars());

export default store;