
export const SERVER_API_URL = "http://localhost:8080";


export const AUTH_TOKEN_KEY = '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';

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER'
};
export const alertConstants = {
  SUCCESS: 'ALERT_SUCCESS',
  ERROR: 'ALERT_ERROR',
  CLEAR: 'ALERT_CLEAR'
};


export const userConstants = {
  LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

  LOGOUT: 'USERS_LOGOUT',

  GETALL_REQUEST: 'USERS_GETALL_REQUEST',
  GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
  GETALL_FAILURE: 'USERS_GETALL_FAILURE'
};

export const PROJECT_STATUS = [
  {
    key: "0",
    value: "New"
  },
  {
    key: "1",
    value: "Progress"
  },
  {
    key: "2",
    value: "Pending"
  },
  {
    key: "3",
    value: "Done"
  }
]

export const TASK_STATUS = {
  NEW: {key: 'NEW', value: 0},
  TODO: {key: 'TODO', value: 1},
  PROGRESS: {key: 'PROGRESS', value: 2},
  DONE: {key: 'DONE', value: 3},
  CANCELED: {key: 'CANCELED', value: 4},
}
