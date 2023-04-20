import './App.css';
import Homepage from './views/Homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Output from './views/Output';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path= '/' element = { <Homepage/>}/>
          <Route path= '/output' element = { <Output/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
