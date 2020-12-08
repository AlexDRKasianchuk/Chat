import firebase from 'firebase';

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

export const sigin = (user) => {
    return async dispatch => {

        dispatch({
            type: USER_LOGIN_REQUEST
        })
        console.log("user login request")
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((data) => {
                const db = firebase.firestore();
                db.collection('users').doc(data.user.uid)
                    .update({
                        isOnline: true
                    })
                    .then(() => {
                        const name = data.user.displayName.split(' ');
                        const firstName = name[0];
                        const lastName = name[1];

                        const loggedInUser = {
                            firstName,
                            lastName,
                            uid: data.user.uid,
                            email: data.user.email
                        }

                        localStorage.setItem('user', JSON.stringify(loggedInUser));
                        dispatch({
                            type: USER_LOGIN_SUCCESS,
                            payload: {
                                user: loggedInUser
                            }
                        })
                        console.log("user login success")
                    }).catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                dispatch({
                    type: USER_LOGIN_FAILURE,
                    payload: {
                        error
                    }
                })
                console.log("user login failure")
            })
    }
}

export const singup = (user) => {

    return async (dispatch) => {
        const db = firebase.firestore();

        dispatch({
            type: USER_LOGIN_REQUEST
        })
        console.log("user login request")
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(data => {
                console.log(data)
                const currentUser = firebase.auth().currentUser;
                const name = `${user.firstName} ${user.lastName}`
                currentUser.updateProfile({
                        displayName: name
                    })
                    .then(() => {
                        //if you are here means it is update succesfully
                        db.collection('users')
                            .doc(data.user.uid)
                            .set({
                                firstName: user.firstName,
                                lastName: user.lastName,
                                uid: data.user.uid,
                                createdAt: new Date(),
                                isOnline: true
                            })
                            .then(() => {
                                //succesful
                                const loggedInUser = {
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    uid: data.user.uid,
                                    email: user.email
                                }
                                localStorage.setItem('user', JSON.stringify(loggedInUser));
                                console.log('user logged in succesfully!!')
                                dispatch({
                                    type: USER_LOGIN_SUCCESS,
                                    payload: {
                                        user: loggedInUser
                                    }
                                })
                                console.log("user login success")
                            })
                            .catch(error => {
                                dispatch({
                                    type: USER_LOGIN_FAILURE,
                                    payload: {
                                        error
                                    }
                                })
                                console.log("user login failure")
                            })
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
}



export const isLoggedInUser = () => {
    return async dispatch => {

        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

        if (user) {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: {
                    user
                }
            })
        } else {
            dispatch({
                type: USER_LOGIN_FAILURE,
                payload: {
                    error: 'Login please again'
                }
            })
        }

    }
}

export const logout = (uid) => {
    return async dispatch => {
        dispatch({
            type: USER_LOGOUT_REQUEST
            
        })
        console.log("user logout request")
        const db = firebase.firestore();

        db.collection('users')
            .doc(uid)
            .update({
                isOnline: false,
            })
            .then(() => {
                firebase.auth()
                    .signOut()
                    .then(() => {
                        localStorage.clear()
                        dispatch({
                            type: USER_LOGOUT_SUCCESS
                        })
                        console.log("user logout success")
                    })
                    .catch(error => {
                        console.log(error)
                        dispatch({
                            type: USER_LOGOUT_FAILURE,
                            payload: {
                                error
                            }
                        })
                        console.log("user logout failure")
                    })

            })
            .catch((error) => {
                console.log(error)
            })

    }
}

export default authReducers;