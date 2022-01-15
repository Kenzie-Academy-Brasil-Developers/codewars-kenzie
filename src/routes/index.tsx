import {
  Routes,
  Route
} from "react-router-dom";
import Dashboard from '../pages/Dashboard/index'
import Header from '../components/Header'
import HomeStyle from './../pages/Home/index';
import Profile from './../components/profile';

const MyRoutes = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomeStyle/>}/>
      <Route path="/dashboard" element={<><Header/><Dashboard /></>} />
      {/* <Route path="/profile" element={<Profile/>} /> */}
    </Routes>
    </>
  );
};

export default MyRoutes;
