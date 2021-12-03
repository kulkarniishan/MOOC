import './App.css';
import {Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';

function App() {

  return (
    <div>
      <Navbar />
      <Switch>
        <Route path='/' component={Home} />
        <Route path='/profile' component={Profile} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
