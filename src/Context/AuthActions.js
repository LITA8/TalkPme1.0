export const LoginStart = (userCredentials) =>({
    type:"LOGIN_START",
    localStorage(userCredentials);
});

export const LoginSuccess = (user) =>({
    type:"LOGIN_SUCCESS",
    payload:user,
    localStorage(user);
});

export const LoginFailure = (error) =>({
    type:"LOGIN_FAILURE",
    payload:error,
});