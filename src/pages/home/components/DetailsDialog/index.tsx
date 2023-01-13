import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import {
  RowData,
  useTableDetails,
} from '../../../../context/TableDetailsContext';
import { DialogData } from './DialogData';

export const DetailsDialog = () => {
  const { open, setOpen, setData } = useTableDetails();

  const handleClose = () => {
    setOpen(false);
    setData({} as RowData);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <DialogData />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
