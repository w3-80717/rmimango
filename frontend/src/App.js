import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
      
          <Navbar />
        <Routes>
        {['/', '/home'].map(url => <Route path={url} element={<Home/>}/>)}
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
