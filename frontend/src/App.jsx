import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';
import Search from './pages/Search';
import Service from './pages/Service';
import PrivateRoute from './components/PrivateRoute.jsx';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/Search' element={<Search />} />
          <Route path='/Service' element={<Service/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path='/user/:userId' element={<User />} />

          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
