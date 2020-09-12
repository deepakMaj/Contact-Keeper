import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = props => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { email, password } = user;
  const { login, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;
  useEffect(() => {
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    if (isAuthenticated) {
      props.history.push('/');
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all field', 'danger');
    } else {
      login({
        email,
        password
      });
    }
  }
  return (
    <div className="form-container" onSubmit={onSubmit}>
      <h1 className="text-center">Account <span className="text-primary">Login</span></h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <input type="submit" value="Login" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Login
