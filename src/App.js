import './App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  useEffect(()=>{ 
    navigate(`/main`);
  },[])
  return (
    <div className="App">
        
    </div>
  );
}

export default App;
