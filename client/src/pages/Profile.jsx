import { Avatar, Typography } from '@mui/material';
import useAuth from '../hooks/useAuth';

function Profile() {
  const userDetails = useAuth().user;

  const profileContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '70px',  
  };

  const avatarStyle = {
    width: '100px',  
    height: '100px',  
    marginBottom: '8px',  
  };

  const nameStyle = {
    marginBottom: '8px', 
  };

  return (
    <div style={profileContainerStyle}>
      <Avatar style={avatarStyle} src={userDetails.image} alt="User Image" />
      <Typography variant="h5" style={nameStyle}>
        {userDetails.name}
      </Typography>
    </div>
  );
}

export default Profile;
