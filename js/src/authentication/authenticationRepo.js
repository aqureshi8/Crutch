import { MOCK_REQUEST, URL_ROOT } from 'src/common/requestHelper.js';

export function usernameExists(username) {
  if (MOCK_REQUEST) {
    return true;
  } else {
    // MAKE REQUEST
  }
}