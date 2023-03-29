import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { addCar } from './actions';

const AddCarForm = () => {
  const [carData, setCarData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    test_drive_fee: '',
    model: '',
    year: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  // const gohome = () => navigate('/');
  // const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!carData.image) {
      toast.error('Please select an image for the car');
      setIsLoading(false);
      return;
    }

    const data = new FormData();
    data.append('car[name]', carData.name);
    data.append('car[description]', carData.description);
    data.append('car[price]', carData.price);
    data.append('car[image]', carData.image);
    data.append('car[test_drive_fee]', carData.testDriveFee);
    data.append('car[model]', carData.model);
    data.append('car[year]', carData.year);

    // dispatch(addCar(data)).then(() => {
    //   gohome();
    //   toast.info('Created Car Successfully');
    //   setIsLoading(false);
    // });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setCarData((prevCarData) => ({
      ...prevCarData,
      image: file,
    }));
  };

  const handleInputChange = (event) => {
    setCarData({ ...carData, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          id="name"
          value={carData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="text"
          id="model"
          value={carData.model}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="date"
          id="year"
          value={carData.year}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="number"
          step="0.01"
          id="testDriveFee"
          value={carData.testDriveFee}
          onChange={handleInputChange}
        />
      </div>
      <div>

        <textarea
          id="description"
          value={carData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="number"
          step="0.01"
          id="price"
          value={carData.price}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input type="file" onChange={handleImageChange} />
      </div>
      <button type="submit">
        {isLoading ? 'Loading...' : 'Add Car'}
      </button>
    </form>
  );
};

export default AddCarForm;
