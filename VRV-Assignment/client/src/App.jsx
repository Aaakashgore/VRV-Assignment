import { useState, useEffect } from 'react';
import './App.css';
import FlipCard from './components/userLogin/userLogin';
import ServicesCard from './components/services/service';
import ProfileCard from './components/userProfile/userProfile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token);
  }, []);

  return (
    <>
      <ServicesCard />
      {/* <h1>👮‍♀ VRV Security Service</h1> */}
      <br />
      <div className="panel">
        {isAuthenticated ? <ProfileCard setIsAuthenticated={setIsAuthenticated} /> : <FlipCard setIsAuthenticated={setIsAuthenticated} />} 
      </div>
    </>
  );
}

export default App;
