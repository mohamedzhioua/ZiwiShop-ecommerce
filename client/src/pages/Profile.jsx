 
import { Avatar, Typography, makeStyles } from '@material-ui/core';
import useAuth from '../hooks/useAuth';
 
const useStyles = makeStyles((theme) => ({
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
  name: {
    marginBottom: theme.spacing(2),
  },
}));

function Profile() {
  const classes = useStyles();
  const userDetails = useAuth().user;

  return (
    <div className={classes.profileContainer}>
      <Avatar className={classes.avatar} src={userDetails.image} alt="User Image" />
      <Typography variant="h5" className={classes.name}>
        {userDetails.name}
      </Typography>
    </div>
  );
}

export default Profile;
