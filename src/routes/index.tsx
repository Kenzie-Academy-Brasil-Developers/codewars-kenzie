import {
  Routes,
  Route
} from "react-router-dom";
import Dashboard from '../pages/Dashboard/index'
import Header from '../components/Header'
import HomeStyle from './../pages/Home/index';

const MyRoutes = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomeStyle/>}/>
      <Route path="/dashboard" element={<><Header/><Dashboard /></>} />
      <Route path="/profile" element={<h2>teste</h2>} />
    </Routes>
    </>
  );
};

export default MyRoutes;
