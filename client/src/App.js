import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import "./stylesheets/alignments.css"
import "./stylesheets/form-elements.css"
import "./stylesheets/custom.css"
import "./stylesheets/sizes.css"
import "./stylesheets/theme.css"
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
        <Route path='/admin' element={<ProtectedRoute><Admin/></ProtectedRoute>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
