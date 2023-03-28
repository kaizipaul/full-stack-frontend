import fetchCarsData, { fetchSingleCar } from '../api';

const initialState = {
  cars: [],
  car: {},
};

// Constants
const FETCH_CARS = 'FETCH_CARS';
const FETCH_ONE_CAR = 'FETCH_ONE_CAR';

// Action Creators
export const getAllCars = (payload) => ({
  type: FETCH_CARS,
  payload,
});

export const getOneCar = (payload) => ({
  type: FETCH_ONE_CAR,
  payload,
});

// Reducers
export const carReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CARS:
      return {
        ...state,
        reservations: [...state.reservations, payload],
      };
    case FETCH_ONE_CAR:
      return { car: payload };

    default:
      return state;
  }
};

const fetchCars = () => (async (dispatch) => {
  const car = await fetchCarsData();
  dispatch(
    {
      type: FETCH_CARS,
      payload: car,
    },
  );
});

export const singleReservation = (id) => (async (dispatch) => {
  const car = await fetchSingleCar(id);
  dispatch(
    {
      type: FETCH_ONE_CAR,
      payload: car,
    },
  );
});

export default fetchCars;
