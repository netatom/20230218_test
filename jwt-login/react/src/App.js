import React, { useState } from "react";
import Login from './Login';
import Admin from './Admin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('token'));

  return (
    <div className="App">
      {isLoggedIn ? <Admin setIsLoggedIn={setIsLoggedIn} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </div>
  )
}

export default App;