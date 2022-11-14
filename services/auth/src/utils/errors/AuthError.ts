export const AuthError = {
  NotFoundFromSession: {
    code: 'A-001-001',
    error: 'User not found',
    message: 'Cannot retrieve user data from current session',
  },
  InvalidCredentials: {
    code: 'A-002-001',
    error: 'Invalid credentials',
    message: 'Email or password is invalid',
  },
};
