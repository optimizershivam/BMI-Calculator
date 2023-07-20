import logo from './logo.svg';
import './App.css';
import MainRoutes from './components/MainRoutes';
import Home from './components/home/Home';
import BmiCalculator from './components/bmiCalculator/BmiCalculator';

function App() {

  return (
    <div className='App'>
      <Home/>
   <MainRoutes/>
    </div>
  );
}

export default App;
