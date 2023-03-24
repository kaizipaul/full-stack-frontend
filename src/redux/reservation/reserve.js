import { baseUrl } from "../api";

const GET_RESERVATION_REQUEST = 'GET_RESERVATION_REQUEST';
const GET_RESERVATION_SUCCESS = 'GET_RESERVATION_SUCCESS';
const GET_RESERVATION_FAIL = 'GET_RESERVATION_FAIL';

const GET_RESERVATION_BY_ID_REQUEST = 'GET_RESERVATION_BY_ID_REQUEST';
const GET_RESERVATION_BY_ID_SUCCESS = 'GET_RESERVATION_BY_ID_SUCCESS';
const GET_RESERVATION_BY_ID_FAIL = 'GET_RESERVATION_BY_ID_FAIL';

// Delete actions here
const DELETE_RESERVATION_REQUEST = 'DELETE_RESERVATION_REQUEST';
const DELETE_RESERVATION_SUCCESS = 'DELETE_RESERVATION_SUCCESS';
const DELETE_RESERVATION_FAIL = 'DELETE_RESERVATION_FAIL';


const CREATE_RESERVATION = 'endpoint-mock/CREATE_RESERVATION';
const RESERVATION_STATUS = 'endpoint-mock/RESERVATION_STATUS';

const initialState = {
  reservation_status: '',
};

export const getReservationAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_RESERVATION_REQUEST });
    const { data } = await axios.get(`${baseUrl}/user/${userId}/reservation`);
    dispatch({ type: GET_RESERVATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_RESERVATION_FAIL, payload: error.message });
  }
};

export const getSingleReservationAction = (id, userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_RESERVATION_BY_ID_REQUEST });
    const { data } = await axios.get(`${baseUrl}/user/${userId}/reservations/${id}`);
    dispatch({ type: GET_RESERVATION_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_RESERVATION_BY_ID_FAIL, payload: error.message });
  }
};

export const deleteReservationAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_RESERVATION_REQUEST });
    const { user } = getState();
    await axios.delete(`${baseUrl}/user/${user.userId}/reservations/${id}`);
    dispatch({ type: DELETE_RESERVATION_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_RESERVATION_FAIL, payload: error.message });
  }
};

export const myReservationsReducer = (state = { loading: true, reservations: null, error: null }, action) => {
  switch (action.type) {
    case GET_RESERVATION_SUCCESS:
      return { loading: true };
    case GET_RESERVATION_SUCCESS:
      return { loading: false, reservations: action.payload };
    case GET_RESERVATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reservationReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_RESERVATION:
      return {
        ...payload,
      };
    case RESERVATION_STATUS:
      return {
        reservation_status: payload,
      };
    default:
      return state;
  }
};

export const reservationDetailsReducer = (state = { loading: true, reservation: null, err: null }, action) => {
  switch (action.type) {
    case GET_RESERVATION_BY_ID_REQUEST:
      return { loading: true };
    case GET_RESERVATION_BY_ID_SUCCESS:
      return { loading: false, reservation: action.payload };
    case GET_RESERVATION_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteReservationReducer = (state = { reservation: null }, action) => {
  switch (action.type) {
    case DELETE_RESERVATION_REQUEST:
      return { loading: true };
    case DELETE_RESERVATION_SUCCESS:
      return { loading: false, message: 'Reservation Deleted successFully' };
    case DELETE_RESERVATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const reservationStatusAction = (payload) => ({
  type: RESERVATION_STATUS,
  payload,
});

export const addReservationToAPI = (details) => async (dispatch) => {
  const {
    from, to, cancelled, userId, carId,
  } = details;
  const reservationURL = `${baseUrl}/user/${userId}/reservations`;
  try {
    await fetch(reservationURL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          from,
          to,
          cancelled,
          user_id: userId,
          car_id: carId,
        },
      ),
    });
    dispatch(reservationStatusAction('Reservation was created successfully!'));
  } catch (error) {
    dispatch(reservationStatusAction('Reservation was not Created!'));
  }
};