import { Search as SearchIcon } from '@mui/icons-material';
import { Box, CircularProgress, InputAdornment, List, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { memo, useCallback, useMemo, useState } from 'react';

import AppDialog from '@/components/common/AppDialog';
import { sampleUsers } from '@/constants/sampleData';
import { useDebounce } from '@/hooks';

import UserItem from './UserItem';

function Search({ open = true, onClose, isLoading = false }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [addingUsers, setAddingUsers] = useState(new Set());

  // Debounce search term to avoid excessive filtering
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Memoized filtered users to prevent unnecessary recalculations
  const filteredUsers = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return sampleUsers;
    }

    const searchLower = debouncedSearchTerm.toLowerCase().trim();
    return sampleUsers.filter((user) => user.name.toLowerCase().includes(searchLower));
  }, [debouncedSearchTerm]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleUserAdd = useCallback(
    async (userId) => {
      if (addingUsers.has(userId)) return;

      setAddingUsers((prev) => new Set(prev).add(userId));

      try {
        // TODO Add logic to add friends
      } catch (error) {
        console.error('Failed to add user:', error);
      } finally {
        setAddingUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });
      }
    },
    [addingUsers]
  );

  const handleClose = useCallback(() => {
    if (onClose && !isLoading) {
      setSearchTerm(''); // Reset search on close
      onClose();
    }
  }, [onClose, isLoading]);

  // Optimize rendering for large lists
  const renderUserItem = useCallback(
    (user) => (
      <UserItem key={user._id} user={user} handler={handleUserAdd} isLoading={addingUsers.has(user._id) || isLoading} />
    ),
    [handleUserAdd, addingUsers, isLoading]
  );

  const dialogContent = (
    <>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name..."
        size="small"
        value={searchTerm}
        onChange={handleSearchChange}
        disabled={isLoading}
        autoFocus
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 2 }}
      />

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {filteredUsers.length > 0 ? (
            <List
              sx={{
                maxHeight: 400,
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: 8,
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: 4,
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888',
                  borderRadius: 4,
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#555',
                },
              }}
              role="list"
              aria-label="Search results"
            >
              {filteredUsers.map(renderUserItem)}
            </List>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              minHeight={200}
              textAlign="center"
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No users found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {searchTerm ? `No users match "${searchTerm}"` : 'No users available'}
              </Typography>
            </Box>
          )}
        </>
      )}
    </>
  );

  return (
    <AppDialog open={open} onClose={handleClose} title="Find People" loading={isLoading}>
      {dialogContent}
    </AppDialog>
  );
}

Search.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default memo(Search);
