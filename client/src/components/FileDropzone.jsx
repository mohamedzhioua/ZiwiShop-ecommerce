import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { Box, Stack } from '@mui/system';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'; import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CustomButton from './CustomButton';
import { Avatar, IconButton, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material';
import { bytesToSize } from '../utils/bytes-to-size';

const FileDropzone = (props) => {
  const {
    accept,
    files,
    onDrop,
    onDropRejected,
    onRemove,
    onRemoveAll,
    onUpload,
    error,
    caption,
    ...other
  } = props;

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    accept: accept,
    maxFiles: 5,
    onDrop,
    onDropRejected
  });

  const errorMessage = fileRejections.length > 0 ? 'Invalid file type' : '';

  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: 'center',
          border: 1,
          borderRadius: 1,
          borderColor: 'divider',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          outline: 'none',
          p: 6,
          ...(isDragActive && {
            backgroundColor: 'action.active',
            opacity: 0.5
          }),
          '&:hover': {
            backgroundColor: 'action.hover',
            cursor: 'pointer',
            opacity: 0.5
          }
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <Avatar
            sx={{
              height: 64,
              width: 64,
              backgroundColor: 'action.hover',
            }}

          >
            <IconButton>
              <CloudUploadOutlinedIcon size="large" color='primary' />
            </IconButton>
          </Avatar>
          <Stack spacing={1}>
            <Typography
              sx={{
                '& span': {
                  textDecoration: 'underline'
                }
              }}
              variant="h4"
            >
              <span>Click to upload</span> or drag and drop
            </Typography>
            {caption && (
              <Typography
                color="text.secondary"
                variant="body2"
              >
                {caption}
              </Typography>
            )}
          </Stack>
        </Stack>


      </Box>
      {errorMessage && (
        <Typography
          color="error"
          sx={{ mt: 2 }}
        >
          {errorMessage}
        </Typography>
      )}
      {error && (
        <Typography
          color="error"
          sx={{ mt: 2 }}
        >
          {error}
        </Typography>
      )}
      {files?.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <List>
            {files?.map((file) => (
              <ListItem
                key={file?.cloudinary_id ? file?.cloudinary_id: file?.path }
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  '& + &': {
                    mt: 1
                  }
                }}
              >
                <ListItemIcon>
                  <img
                    src={file?.cloudinary_id ?  file?.url : URL.createObjectURL(file)}
                    alt={file?.name || file?.cloudinary_id}
                    style={{ width: 50, height: 50 }}
                  />

                </ListItemIcon>
                <ListItemText
                  primary={file?.name?.split('.').pop() || file?.url?.split('/').pop()}
                  primaryTypographyProps={{
                    color: 'textPrimary',
                    variant: 'subtitle2'
                  }}
                  secondary={bytesToSize(file?.size)}
                />
                <Tooltip title="Remove">
                  <IconButton
                    edge="end"
                    onClick={() => onRemove && onRemove(file)}
                  >
                    <CloseOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 2
            }}
          >
            <CustomButton
              onClick={onRemoveAll}
              size="small"
              type="button"
              variant="text"
            >
              Remove All
            </CustomButton>
            <CustomButton
              onClick={onUpload}
              size="small"
              sx={{ ml: 2 }}
              type="button"
              variant="contained"
            >
              Upload
            </CustomButton>
          </Box>
        </Box>
      )}
    </div>
  );
};

FileDropzone.propTypes = {
  accept: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string.isRequired).isRequired),
  caption: PropTypes.string,
  error: PropTypes.string,
  files: PropTypes.array,
  onDrop: PropTypes.func,
  onDropRejected: PropTypes.func,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  onUpload: PropTypes.func,

};

FileDropzone.defaultProps = {
  files: []
};

export default FileDropzone;
