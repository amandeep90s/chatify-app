import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { Controller } from 'react-hook-form';

/**
 * Generic form field component with react-hook-form integration
 */
function FormField({
  name,
  control,
  label,
  type = 'text',
  placeholder,
  multiline = false,
  rows = 1,
  disabled = false,
  autoFocus = false,
  autoComplete = 'off',
  fullWidth = true,
  margin = 'normal',
  variant = 'outlined',
  size = 'medium',
  error,
  helperText,
  ...rest
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          fullWidth={fullWidth}
          label={label}
          type={type}
          placeholder={placeholder}
          margin={margin}
          variant={variant}
          size={size}
          multiline={multiline}
          rows={multiline ? rows : undefined}
          error={!!fieldState.error || !!error}
          helperText={fieldState.error?.message || helperText}
          disabled={disabled}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          {...rest}
        />
      )}
    />
  );
}

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.string,
  fullWidth: PropTypes.bool,
  margin: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default memo(FormField);
