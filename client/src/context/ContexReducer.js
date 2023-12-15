export const ContexReducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START":
            return {
                user:null,
                isFetching:true,
                error:false
            };
           
             case "LOGIN_SUCCESS":
                return {
                user:action.payload,
                isFetching:false,
                error:false
                };
            case "LOGIN_FAILURE":
                return {
                user:null,
                isFetching:false,
                error:true
                };
            case "LOGOUT":
                return {
                user:null,
                isFetching:false,
                error:false
                    };
            case "FOLLOW":
                return {
                user:{...state.user, followings: [...state.user.followings, action.payload]},
                isFetching:false,
                error:false
                };
            case "UNFOLLOW":
                return {
                user:{...state.user, followings: state.user.followings.filter(item => item !== action.payload)},
                isFetching:false,
                error:false
                };
            default:
                return {...state}
    }
}
export default ContexReducer;