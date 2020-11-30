import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import Card from '../../components/UI/Card/Card'
import { useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { singup } from '../../reducers/authReducers';

const Register = (props) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state=>state.auth);

  if(auth.authenticated){
    return <Redirect to={'/'} />
}


  const registerUser = (e)=>{
    e.preventDefault();

    const user={
      firstName,lastName,email,password
    }
    
    dispatch(singup(user))
  }
  return(
      <Layout>
          <div className='registerContainer'>
             <Card>
                <form onSubmit={registerUser}>
                  <h3>Sign up</h3>
                <input name="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name"/>
                <input name="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name"/>
                <input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>

                <div>
                <button>Sign up</button>
                </div>
                </form>
              </Card>
          </div>
      </Layout>
   )

 }

export default Register