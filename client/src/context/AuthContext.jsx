import { createContext, useContext } from 'react';

// Simple auth context for demo purposes
const AuthContext = createContext();

// Hook to use auth context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children, user }) => {
  const authValue = {
    user,
    isAuthenticated: Boolean(user),
    // Add more auth methods here later (login, logout, etc.)
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

// Export hook and context through the AuthProvider
AuthProvider.useAuth = useAuth;
AuthProvider.Context = AuthContext;

export default AuthProvider;
