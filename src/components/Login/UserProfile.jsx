import React, { useContext, useEffect, useState } from "react";
import { Card, FloatingLabel, Button, Form } from "react-bootstrap";
import { authContext } from "../../context/authContext";
import { useNavigate } from "react-router";

const UserProfile = () => {
  const { userDetails, editUser, setUserDetails, fetchUser } =
    useContext(authContext);
    const navigate = useNavigate()
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState(
    userDetails.profilePicture || ""
  );
  const [userImg, setUserImg] = useState("");
  const [edit, setEdit] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    !userDetails && navigate("/")
    
  }, [])
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = new FormData();
    userData.append("firstName", firstName);
    userData.append("lastName", lastName);
    userData.append("picture", userImg);
    await editUser(userData);
    setEdit(false);
    fetchUser();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setFirstname(value);
    } else if (name === "email") {
      setLastName(value);
    }
  };

  const handleEdit = () => {
    setEdit(true);
    setFirstname(userDetails.firstName);
    setLastName(userDetails.lastName);
  };

  const handlePasswordModal = () => {
    setShowPasswordModal(!showPasswordModal);
  };

  return (
    <div>
      {!edit ? (
        <Card style={{ width: "18rem", height: "20rem" }}>
          <Card.Body>
            <Card.Title>{userDetails.firstName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {userDetails.email}
            </Card.Subtitle>
            <Card.Img variant="top" src={profilePicture} alt="Profile Image" />
          </Card.Body>
          <Button variant="primary" onClick={handleEdit}>
            Edit Profile
          </Button>
        </Card>
      ) : (
        <Card style={{ width: "20rem" }}>
          <Form onSubmit={handleSubmit}>
            <Card.Body>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder={userDetails.email}
                  value={lastName}
                  name="email"
                  onChange={handleChange}
                />
              </FloatingLabel>

              <FloatingLabel label="Full name">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder={userDetails.firstName}
                  value={firstName}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <FloatingLabel label="Profile Image">
                <Form.Control
                  type="file"
                  accept="image/jpeg, image/gif" // Update the accepted file types
                  onChange={(e) => setUserImg(e.target.files[0])}
                  required
                />
                {userImg && (
                  <img
                    src={URL.createObjectURL(userImg)}
                    alt="Selected Profile Image"
                    style={{ marginTop: "10px", maxWidth: "100px" }}
                  />
                )}
              </FloatingLabel>
            </Card.Body>
            <div className="d-flex justify-content-around mt-2 mb-2">
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
              <Button variant="secondary" onClick={() => setEdit(false)}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default UserProfile;
