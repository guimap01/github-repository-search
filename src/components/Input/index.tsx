import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  OutlinedInputProps,
} from '@mui/material';
import { forwardRef } from 'react';

type InputProps = OutlinedInputProps & {
  label?: string;
  type?: string;
  endAdornment?: React.ReactNode;
  onClickIcon?: () => void;
};

export const Input = forwardRef(
  ({ endAdornment, label, onClickIcon, type, ...rest }: InputProps, ref) => {
    return (
      <FormControl variant="outlined" fullWidth>
        {label && (
          <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
        )}
        <OutlinedInput
          id="outlined-adornment-password"
          type={type || 'text'}
          endAdornment={
            endAdornment && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="submit search"
                  onClick={onClickIcon}
                  edge="end"
                >
                  {endAdornment}
                </IconButton>
              </InputAdornment>
            )
          }
          label={label}
          {...rest}
          ref={ref}
        />
      </FormControl>
    );
  }
);
