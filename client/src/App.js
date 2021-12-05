import './App.css';
import { useEffect, useState } from 'react';
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

import { axiosInstance } from './axiosSetup';
import { login } from './Redux/features/userSlice';
import { useDispatch } from 'react-redux';
import Course from './components/Course/Course';
function App() {

  const dispatch = useDispatch();
  const [userSet, setUserSet] = useState(false);

  useEffect(() => {
    axiosInstance.get('/user/get.php', { withCredentials: true })
      .then(response => {
        dispatch(login(response.data.user))
      })
      .catch(error => {
        console.log(error.response)
      });
    setUserSet(true)
  }, [dispatch])

  return (
    <div>

      {userSet && <>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/profile' component={Profile} />
          <Route path='/contacts' component={Contacts} />
          <Route path='/about' component={About} />
          <Route path='/course_details/:id' exact component={Details} />
          <Route path='/course/:id' component={Course} />
        </Switch>
        <Footer />
      </>
      }
    </div>
  );
}

export default App;
