import PropTypes from "prop-types";
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const ActionsColumn = ({ item, onUpdate, onDelete }) => {
  const handleUpdate = () => {
    onUpdate(item);
  };

  const handleDelete = () => {
    onDelete(item);
  };

  return (
    <>
      <IconButton onClick={handleUpdate}>
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <DeleteOutlineOutlinedIcon fontSize="small" />
      </IconButton>
    </>
  );
};
ActionsColumn.propTypes = {
  item: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ActionsColumn;
