import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages';
import About from './pages/About';
import Commuter from './pages/Commuter';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About/>} />
          <Route path='/commuter' element={<Commuter/>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
