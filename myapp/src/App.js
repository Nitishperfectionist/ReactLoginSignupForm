import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogin = (credential) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) => user.email === credential.email && user.password === credential.password);

    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSignup = (credential) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExist = users.some((user) => user.email === credential.email);

    if (userExist) {
      alert('User already exists');
    } else {
      users.push(credential);
      localStorage.setItem('users', JSON.stringify(users));
      alert("siign up successfull,please login")
      setIsLogin(true); // Redirect to login after signup
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <div>
          <h1>Welcome, you are logged in</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          {isLogin ? (
            <>
              <h2>Login</h2>
              <Login onLogin={handleLogin} />
              <p>
                Don't have an account? <button onClick={toggleForm}>Signup</button>
              </p>
            </>
          ) : (
            <>
              <h2>Signup</h2>
              <Signup onSignup={handleSignup} />
              <p>
                Already have an account? <button onClick={toggleForm}>Login</button>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
