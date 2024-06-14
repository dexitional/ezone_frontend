import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet} from 'react-router-dom';
import Login from './pages/Login';
const Home = lazy(() => import('./pages/Home'));

import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useUserStore } from './utils/authService';
import AISPRoute from './routes/AISPRoute'
import AISRoute from './routes/AISRoute'
import AMSRoute from './routes/AMSRoute'
import AMSPRoute from './routes/AMSPRoute'
import FMSRoute from './routes/FMSRoute'
import EVSRoute from './routes/EVSRoute'
import PrintRoute from './routes/PrintRoute'
import Loader from './components/Loader';

const { REACT_APP_GOOGLE_CLIENT_ID } = import.meta.env;

function App() {
  
  const { isAuthenticated, user } = useUserStore(state => state);
  const router = createBrowserRouter([
         
    // Public Routes
    // { path: "/", element: <Navigate to={{ pathname: isAuthenticated() ? '/dash' : '/login' }} replace />,  },
    { path: "/", element: <Navigate to={{ pathname: '/dash' }} replace />,  },
    { path: "/login", element: isAuthenticated() ? user?.user?.group_id == 1 ? <Navigate to={{ pathname:'/evs/dash'}} replace /> : user?.user?.group_id == 3 ? <Navigate to={{ pathname:'/amsp/dash' }} replace /> : <Navigate to={{ pathname:'/dash'}} replace /> : <Login /> },
    // Protected Routes
    { 
      element: isAuthenticated() ? <Outlet/> : <Navigate to={{ pathname:'/login'}} replace />,
      children:[
         { path: "dash", element: user?.user?.group_id == 1 ? <Navigate to={{ pathname:'/evs/dash'}} replace /> : user?.user?.group_id == 3 ? <Navigate to={{ pathname:'/amsp/dash' }} replace /> : <Suspense fallback={<Loader/>}><Home /></Suspense> },
         /* ADMISSION PORTAL ROUTE */
         {...AMSPRoute },
         /* STUDENT PORTAL ROUTE */
         {...AISPRoute },
         /* ADMISSION SYSTEM ROUTE */
         {...AMSRoute },
         /* ACADEMIC SYSTEM ROUTE */
         {...AISRoute },
         /* FINANCE SYSTEM ROUTE */
         {...FMSRoute },
         /* ELECTA SYSTEM ROUTE */
         {...EVSRoute },
         /* PRINT LAYOUT & ROUTE */
         {...PrintRoute },
      ]
    },
    
    { path: "*", element: isAuthenticated() ? <Navigate to={{ pathname:'/dash'}} replace /> : <Navigate to={{ pathname:'/login'}} replace /> },
  ]);

  
  return (
     <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
        <Toaster />
        <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;


/**
 

 <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dash" element={<Home />} />
          <Route path="/evs" element={<EVSPage />} />
          <Route path="/evsmain" element={<EVSDashPage />} />
         <Route
            path="/protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          /> 
          </Routes>
 */