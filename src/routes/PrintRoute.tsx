import React from 'react'

import PrintLayout from '../components/print/PrintLayout';
import PrintRegisterSlip, { loader as printRegLoader } from '../components/print/PrintRegisterSlip';
import PrintAdmissionSlip, { loader as printAdmissionLoader } from '../components/print/PrintAdmissionSlip';
import { useUserStore } from '../utils/authService';

const user = useUserStore.getState().user
const isAuthenticated = useUserStore.getState().isAuthenticated

const evsRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'evs')
const amsRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'ams')

const PublicRoute:any =   {
   path: "print",
   element: <PrintLayout />,
   children: [
      // Registration Slip
      {  path:'registration', 
         element: <PrintRegisterSlip />,
         loader: printRegLoader
      },
      {  path:'registration/:registrationId', 
         element: <PrintRegisterSlip />,
         loader: printRegLoader
      },
      
      // Admission Slip
      {  path:'admission', 
         element: <PrintAdmissionSlip />,
         loader: printAdmissionLoader
      },
      {  path:'admission/:voucherId', 
         element: <PrintAdmissionSlip />,
         loader: printAdmissionLoader
      },
   ]
}


export default PublicRoute