import './App.css';
import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
<<<<<<< HEAD
import About from './components/About/About';
import Details from './components/Details/Details';
import Contacts from './components/Contacts/Contacts';

=======
import { axiosInstance } from './axiosSetup';
import { login } from './Redux/features/userSlice';
import { useDispatch } from 'react-redux';
>>>>>>> e6cfc4c9d8cb2e00db7b81e55ca0b12a1b72d641
function App() {

  const dispatch = useDispatch();
  const [userSet, setUserSet] = useState(false);

  useEffect(() => {
    axiosInstance.get('/user/get.php', { withCredentials: true })
      .then(response => {
        dispatch(login(response.data.userData))
      })
      .catch(error => {
        console.log(error.response)
      });
    setUserSet(true)
  }, [dispatch])

  return (
    <div>
<<<<<<< HEAD
      <Navbar />
      
      <Switch>
        <Route path='/' component={Home} />
        <Route path='/profile' component={Profile} />
        <Route path='/contacts' component={Contacts} />
        <Route path='/about' component={About} />
        <Route path='/details' component={Details} />
      </Switch>
      <Footer />
=======
      {userSet && <>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/profile' component={Profile} />
        </Switch>
        <Footer />
      </>
      }
>>>>>>> e6cfc4c9d8cb2e00db7b81e55ca0b12a1b72d641
    </div>
  );
}

export default App;
