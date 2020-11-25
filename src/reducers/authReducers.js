const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
USER_LOGIN_SUCCESS= 'USER_LOGIN_SUCCESS',
USER_LOGIN_FAILURE= 'USER_LOGIN_FAILURE';

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
            default:
                return state
    }
}

export default authReducers;