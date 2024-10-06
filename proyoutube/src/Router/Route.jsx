import {
  createBrowserRouter,
} from "react-router-dom";
import App from '../App.jsx'
import SingleVideo from "../pages/SingleVideo.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

  },
  {
    path: "/home",
    element: <Home />,

  },
  {
    path: "/register",
    element: <Register />,

  },
  {
    path: "/login",
    element: <Login />,

  },
  {
    path: "/watch/:catId/:id",
    element: <SingleVideo />,
  },
]);
export default router;
