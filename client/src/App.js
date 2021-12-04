import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import About from './components/About/About';
import Details from './components/Details/Details';
import Contacts from './components/Contacts/Contacts';

function App() {

  return (
    <div>
      <Navbar />
      
      <Switch>
        <Route path='/' component={Home} />
        <Route path='/profile' component={Profile} />
        <Route path='/contacts' component={Contacts} />
        <Route path='/about' component={About} />
        <Route path='/details' component={Details} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
