import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllCars, deleteCar } from '../../redux/deletecar/deletecar';
import trashcan from '../../assets/trash.gif';
import './deletecar.css';
import loaders from '../../assets/loader.gif';

const RemoveCar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);
  const { cars, loading, error } = useSelector((state) => state.delete);

  const handledelete = (carId) => {
    dispatch(deleteCar(carId)).then(() => {
      toast.info('Deleted Car Successfully');
    });
  };

  const deletecar = (id) => {
    handledelete(id);
  };

  if (loading) {
    return (
      <div className="center"><img className="loading-cars" src={loaders} alt="loading" /></div>);
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="d-flex w-full del-container">
      <ol className="list-group list-group-numbered del-list">
        <div className="d-flex w-full del-header">
          <h3>
            Delete A Car
          </h3>
          <img src={trashcan} alt="trash car" className="trash" />
        </div>
        {cars.map((car) => (
          <li key={car.id} className="list-group-item d-flex justify-content-between align-items-start">
            <span className="images">
              {' '}
              <img src={car.image_url} alt="img" className="del-car-image d-flex flex-column" />
            </span>
            <span className="cars">{car.name}</span>
            <span className="del">
              <button
                type="button"
                onClick={() => deletecar(car.id)}
              >
                delete
              </button>
            </span>
          </li>

        ))}
      </ol>
    </div>
  );
};

export default RemoveCar;
