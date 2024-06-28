import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import { Products } from "./pages/Products";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import { Users } from "./pages/Users";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        {/* <PrivateRoutes> */}
        <SignIn />
        {/* </PrivateRoutes> */}
      </AuthProvider>
    ),
  },
  {
    path: "/products",
    element: (
      <AuthProvider>
        <PrivateRoutes>
          <Products />
        </PrivateRoutes>
      </AuthProvider>
    ),
  },
  {
    path: "/users",
    element: (
      <AuthProvider>
        <PrivateRoutes>
          <Users />
        </PrivateRoutes>
      </AuthProvider>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthProvider>
        <PrivateRoutes>
        <SignUp />
        </PrivateRoutes>
      </AuthProvider>
    ),
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App