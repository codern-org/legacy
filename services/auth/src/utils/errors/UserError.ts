export const UserError = {
  Duplicated: {
    code: 'U-001-001',
    error: 'Duplicated user',
    message: 'This user already registered',
  },
  InvalidEmail: {
    code: 'U-002-001',
    error: 'Invalid user data',
    message: 'Email is invalid',
  },
  PasswordLength: {
    code: 'U-002-002',
    error: 'Invalid user data',
    message: 'Password length must be 8-15 and alphanumeric',
  },
};
