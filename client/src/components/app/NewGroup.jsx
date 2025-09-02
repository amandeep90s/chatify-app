import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Chip, Stack, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { memo, useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import AppDialog from '@/components/common/AppDialog';
import { sampleUsers } from '@/constants/sampleData';
import { createGroupSchema } from '@/validation/group';

import UserItem from './UserItem';

// Optimized styles to prevent recreation on each render
const dialogContentStyles = {
  p: { xs: '1rem', sm: '2rem' },
  minHeight: '400px',
};

const membersContainerStyles = {
  maxHeight: '300px',
  overflowY: 'auto',
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 1,
  p: 1,
};

const selectedMembersStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 1,
  mt: 1,
  mb: 2,
};

function NewGroup({ open = false, onClose, onCreateGroup, isLoading = false, error = null }) {
  const [selectedMembers, setSelectedMembers] = useState(new Set());

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(createGroupSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      members: [],
    },
  });

  // Memoize filtered available users
  const availableUsers = useMemo(() => {
    return sampleUsers.filter((user) => !selectedMembers.has(user._id));
  }, [selectedMembers]);

  // Memoize selected user details
  const selectedUserDetails = useMemo(() => {
    return sampleUsers.filter((user) => selectedMembers.has(user._id));
  }, [selectedMembers]);

  const handleMemberToggle = useCallback(
    (userId) => {
      if (isLoading || isSubmitting) return;

      setSelectedMembers((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(userId)) {
          newSet.delete(userId);
        } else {
          newSet.add(userId);
        }

        // Update form value for validation
        const membersArray = Array.from(newSet);
        setValue('members', membersArray, { shouldValidate: true });

        return newSet;
      });
    },
    [isLoading, isSubmitting, setValue]
  );

  const handleRemoveMember = useCallback(
    (userId) => {
      if (isLoading || isSubmitting) return;

      setSelectedMembers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);

        // Update form value for validation
        const membersArray = Array.from(newSet);
        setValue('members', membersArray, { shouldValidate: true });

        return newSet;
      });
    },
    [isLoading, isSubmitting, setValue]
  );

  const handleClose = useCallback(() => {
    if (isLoading || isSubmitting) return;

    reset();
    setSelectedMembers(new Set());
    onClose?.();
  }, [isLoading, isSubmitting, reset, onClose]);

  const onSubmit = useCallback(
    async (data) => {
      try {
        await onCreateGroup?.({
          ...data,
          members: Array.from(selectedMembers),
          isGroupChat: true,
        });

        // Reset form and close dialog on success
        reset();
        setSelectedMembers(new Set());
        onClose?.();
      } catch (error) {
        console.error('Failed to create group:', error);
      }
    },
    [selectedMembers, onCreateGroup, reset, onClose]
  );

  const isFormDisabled = isLoading || isSubmitting;

  const dialogActions = (
    <>
      <Button variant="text" color="inherit" onClick={handleClose} disabled={isFormDisabled}>
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit(onSubmit)}
        disabled={isFormDisabled || selectedMembers.size === 0}
        type="submit"
      >
        {isSubmitting ? 'Creating...' : 'Create Group'}
      </Button>
    </>
  );

  return (
    <AppDialog
      open={open}
      onClose={handleClose}
      title="Create New Group"
      loading={isLoading || isSubmitting}
      error={error}
      actions={dialogActions}
      contentStyles={dialogContentStyles}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Group Name"
              placeholder="Enter group name"
              margin="normal"
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={isFormDisabled}
              autoComplete="off"
              autoFocus
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Description (Optional)"
              placeholder="Enter group description"
              margin="normal"
              variant="outlined"
              multiline
              rows={2}
              error={!!errors.description}
              helperText={errors.description?.message}
              disabled={isFormDisabled}
              autoComplete="off"
            />
          )}
        />

        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Select Members ({selectedMembers.size})
        </Typography>

        {errors.members && (
          <Typography variant="caption" color="error" display="block" sx={{ mb: 1 }}>
            {errors.members.message}
          </Typography>
        )}

        {/* Selected Members Display */}
        {selectedMembers.size > 0 && (
          <Box sx={selectedMembersStyles}>
            {selectedUserDetails.map((user) => (
              <Chip
                key={user._id}
                label={user.name}
                onDelete={() => handleRemoveMember(user._id)}
                color="primary"
                variant="outlined"
                disabled={isFormDisabled}
              />
            ))}
          </Box>
        )}

        {/* Available Users List */}
        <Box sx={membersContainerStyles}>
          {availableUsers.length > 0 ? (
            <Stack spacing={0.5}>
              {availableUsers.map((user) => (
                <UserItem key={user._id} user={user} handler={handleMemberToggle} isLoading={isFormDisabled} />
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 2 }}>
              {selectedMembers.size > 0 ? 'All available users have been selected' : 'No users available'}
            </Typography>
          )}
        </Box>
      </form>
    </AppDialog>
  );
}

// PropTypes for better development experience
NewGroup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onCreateGroup: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

// Custom comparison function for better memoization
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.open === nextProps.open &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.error === nextProps.error &&
    prevProps.onClose === nextProps.onClose &&
    prevProps.onCreateGroup === nextProps.onCreateGroup
  );
};

export default memo(NewGroup, areEqual);
