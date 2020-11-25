const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
USER_LOGIN_SUCCESS= 'USER_LOGIN_SUCCESS',
USER_LOGIN_FAILURE= 'USER_LOGIN_FAILURE',
USER_LOGOUT_REQUEST='USER_LOGOUT_REQUEST',
USER_LOGOUT_SUCCESS='USER_LOGOUT_SUCCESS',
USER_LOGOUT_FAILURE='USER_LOGOUT_FAILURE';

const initialState={
    firstName:'',
    lastName:'',
    email:'',
    authenticating: false,
    authenticated: false,
    error: null
}

const authReducers = (state = initialState, action)=>{
    switch(action.type){
       
        case USER_LOGIN_REQUEST:
           return{
                ...state,
                authenticating:true
            }
        case USER_LOGIN_SUCCESS:
            return{
                ...state,
                ...action.payload.user,
                authenticated:true,
                authenticating:false,
                firstName: action.payload.user.firstName,
                lastName: action.payload.user.lastName
            }
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                authenticated:false,
                authenticating:false,
                error: action.payload.error
            }
        case USER_LOGOUT_REQUEST:
                return state
        case USER_LOGOUT_SUCCESS:
                return {
                    ...initialState
                }
        case USER_LOGOUT_FAILURE:
            return {
                ...state,
                error:action.payload.error
            }
            default:
                return state
    }
}

export default authReducers;