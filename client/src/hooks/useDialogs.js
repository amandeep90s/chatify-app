import { useCallback, useState } from 'react';

/**
 * Generic dialog/modal state management hook
 * @param {object} initialState - Initial state for all dialogs
 * @returns {object} - Dialog states and control functions
 */
export const useDialogs = (initialState = {}) => {
  const [dialogs, setDialogs] = useState(initialState);

  const openDialog = useCallback((dialogName) => {
    setDialogs((prev) => ({
      ...prev,
      [dialogName]: true,
    }));
  }, []);

  const closeDialog = useCallback((dialogName) => {
    setDialogs((prev) => ({
      ...prev,
      [dialogName]: false,
    }));
  }, []);

  const toggleDialog = useCallback((dialogName) => {
    setDialogs((prev) => ({
      ...prev,
      [dialogName]: !prev[dialogName],
    }));
  }, []);

  const closeAllDialogs = useCallback(() => {
    setDialogs((prev) => {
      const newState = {};
      Object.keys(prev).forEach((key) => {
        newState[key] = false;
      });
      return newState;
    });
  }, []);

  const isDialogOpen = useCallback(
    (dialogName) => {
      return dialogs[dialogName] || false;
    },
    [dialogs]
  );

  return {
    dialogs,
    openDialog,
    closeDialog,
    toggleDialog,
    closeAllDialogs,
    isDialogOpen,
  };
};
