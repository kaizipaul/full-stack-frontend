import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SideBar from '../components/sidebar/SideBar';
import Cars from '../pages/cars/Cars';
import AddCar from '../components/addCar/AddCar';
import UserReservationTable from '../components/userReservationTable/UserReservationTable';
import RemoveCar from '../components/deleteCar/deletecar';
import ReservationForm from '../components/reservationForm/ReservationForm';
import DetailsPage from '../components/detailsPage/DetailsPage';
import Navbar from '../components/navbar/MobNavbar';

const AuthenticatedRoute = () => (
  <>
    <Navbar />
    <SideBar />
    <Routes>
      <Route path="/login" element={<Navigate to="/" />} />
      <Route path="/" element={<Cars />} />
      <Route path="/add-car" element={<AddCar />} />
      <Route path="/myreservations" element={<UserReservationTable />} />
      <Route path="/delete-car" element={<RemoveCar />} />
      <Route path="/reserve" element={<ReservationForm />} />
      <Route path="/details/:id" element={<DetailsPage />} />
    </Routes>
  </>
);
export default AuthenticatedRoute;
