import firebase from 'firebase';

const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
    USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE',
    USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST',
    USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS',
    USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';


export const singup = (user) => {

    return async (dispatch) => {
        const db = firebase.firestore();

        dispatch({
            type: USER_LOGIN_REQUEST
        })

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
                            })
                            .catch(error => {
                                dispatch({
                                    type: USER_LOGIN_FAILURE,
                                    payload: {
                                        error
                                    }
                                })
                                console.log(error)
                            })
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const sigin = (user) => {
    return async dispatch => {

        dispatch({
            type: USER_LOGIN_REQUEST
        })

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

                    }).catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: USER_LOGIN_FAILURE,
                    payload: {
                        error
                    }
                })
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
                    })
                    .catch(error => {
                        console.log(error)
                        dispatch({
                            type: USER_LOGOUT_FAILURE,
                            payload: {
                                error
                            }
                        })
                    })

            })
            .catch((error) => {
                console.log(error)
            })

    }
}