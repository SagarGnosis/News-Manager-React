import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import './Profile.css';
import { Button, Avatar, Container, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setError('');
    setSuccess('');
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match!");
      return;
    }
    
    try {
      const response = await axios.post(`${apiUrl}/api/auth/change-password`, {
        oldPassword,
        newPassword,
      }, { withCredentials: true });

      setSuccess(response.data);
      setError('');
      handleClose(); // Close the dialog after successful password change
    } catch (err) {
      setError(err.response?.data || "An error occurred while changing the password.");
    }
  };

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
        <Button onClick={handleClickOpen} variant="contained" color="primary">
          Change Password
        </Button>
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">{success}</Typography>}
          <TextField
            margin="dense"
            label="Old Password"
            type="password"
            fullWidth
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Confirm New Password"
            type="password"
            fullWidth
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleChangePassword} color="primary">Change Password</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
