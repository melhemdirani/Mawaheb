
export const signIn = (object) => ({
  type: "SIGNIN",
  payload: object
});

export const signOut = () => ({
  type: "SIGNOUT",
});

export const setRole = (role) => ({
  type: "SETROLE",
  payload: role
});
export const clearNotifications = () => ({
  type: "CLEARNOTIFICATIONS",
});
