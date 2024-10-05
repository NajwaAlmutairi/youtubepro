import {
  createBrowserRouter,
} from "react-router-dom";
import App from '../App.jsx'
import SingleVideo from "../pages/SingleVideo.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

  },
  {
    path: "/watch/:catId/:id",
    element: <SingleVideo />,
  },
]);
export default router;
