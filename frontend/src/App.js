// import logo from './logo.svg';
// import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup'

function App() {
 let router=createBrowserRouter([
    {
      path:'',
      element:<Root/>,
      children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path:'signin',
          element:<Signin/>
        }
        ,
        {
          path:'signup',
          element:<Signup/>
        }
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
