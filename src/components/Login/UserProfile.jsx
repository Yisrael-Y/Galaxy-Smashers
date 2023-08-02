import React, { useContext, useState, useEffect } from 'react';
import { authContext } from '../../context/authContext';
import '../../componentstyles/profile.css'
import newAxios from '../Axios';

const UserProfile = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    bio: '',
  });
  const { userDetails, fetchUser } = useContext(authContext);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('')

useEffect(() => {
  fetchUser();
}, [userDetails]);


  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    setMessage('')
    setError(null)
    event.preventDefault();
    try {
      const response = await newAxios.put(`/users/updateUser`, formValues)
      setMessage(response.data.message);
      setFormValues({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        bio: '',
      })
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div className="ProfileCard">
      <div className="ProfileCardTop">
        <img className='ProfileManPic' src="/male3d.png" alt="" />
        <div className="ProfileCard-header">
            <h1>My Profile</h1>
        </div>
      </div>
      <div className="CurrentUserDetails">
        <p>First Name: {userDetails ? userDetails.firstName : '' }</p>
        <p>Last Name: {userDetails? userDetails.lastName : ''}</p>
        <p>Email: {userDetails ? userDetails.email : ''}</p>
        <p>Nickname: {userDetails? userDetails.nickname : ''}</p>
        <p>Phone Number: {userDetails ? userDetails.phone : 'None'}</p>
        <p>Bio: {userDetails? userDetails.bio : 'None'}</p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="ProfileForm" >
          <label className='ProfileLabels' htmlFor="email">Email:</label>
          <input
            className='ProfileInput'
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />

          <label className='ProfileLabels' htmlFor="firstName">First Name:</label>
          <input
            className='ProfileInput'
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
          />

          <label className='ProfileLabels' htmlFor="lastName">Last Name:</label>
          <input
            className='ProfileInput'
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
          />

          <label className='ProfileLabels' htmlFor="phoneNumber">Phone Number:</label>
          <input
            className='ProfileInput'
            type="number"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
          />

          <label className='ProfileLabels' htmlFor="bio">Short Bio:</label>
          <textarea
            className='ProfileInput'
            name="bio"
            rows="4"
            value={formValues.bio}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="ProfileForm-saveButton">
            Save
          </button>
        </form>
        {message && <div className='Success'>{message}</div>}
        {error && <div className='ErrorMessage'>{error}</div>}
      </div>
    </div>
  );
};

export default UserProfile;