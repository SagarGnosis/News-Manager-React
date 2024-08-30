
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import './Profile.css';
import { Button, Avatar, Container, Typography, Paper } from '@mui/material';

const Profile = () => {
  const { currentUser, logout } = useContext(AuthContext);

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <Container maxWidth="sm" className="profile-container">
      <Paper className="profile-paper" elevation={3}>
        <Avatar src={currentUser.profilePic} alt={currentUser.name} className="profile-avatar" />
        <Typography variant="h5" component="h1" gutterBottom>
          Profile
        </Typography>
        <div className="profile-details">
          <Typography variant="body1"><strong>Username:</strong> {currentUser.username}</Typography>
          <Typography variant="body1"><strong>Name:</strong> {currentUser.name}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {currentUser.email}</Typography>
          <Typography variant="body1"><strong>Role:</strong> {currentUser.role}</Typography>
        </div>
        <Button
          onClick={logout}
          variant="contained"
          color="error"
          startIcon={<ExitToAppIcon />}
          className="logout-button"
        >
          Logout
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;
