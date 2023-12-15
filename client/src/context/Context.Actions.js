export const loginStart = () => ({
   type: "LOGIN_START"
   });

export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload:user,
    });

export const loginFailure = () => ({
    type: "LOGIN_FAILURE",   
    });

export const logout = () => ({
    type: "LOGOUT",      
    });

export const folow = (id) => ({
    type: "FOLLOW",
    payload: id           
    });
    
export const unfolow = (id) => ({
    type: "UNFOLLOW",
    payload: id
     });