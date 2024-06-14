import React from 'react'
import { Navigate } from 'react-router-dom';
import AISPPager from '../components/aisp/AISPPager';
import AISPLayout from '../components/aisp/AISPLayout';
import PgAISPProfile,{ loader as aispProfileLoader} from '../pages/aisp/PgAISPProfile';
import PgAISPProfileForm, {  loader as aispProfileFormLoader, action as aispProfileAction } from '../pages/aisp/PgAISPProfileForm';
import PgAISPNotices, { loader as nssNoticesLoader } from '../pages/aisp/PgAISPNotices';
import PgAISPNotice, { loader as nssNoticeLoader } from '../pages/aisp/PgAISPNotice';
import PgAISPServices, { loader as nssServicesLoader } from '../pages/aisp/PgAISPServices';
import PgAISPService, { loader as nssServiceLoader } from '../pages/aisp/PgAISPService';
import PgAISPServiceForm, { loader as nssServiceFormLoader, action as nssServiceFormAction } from '../pages/aisp/PgAISPServiceForm';
import PgAISPPasswordForm, { action as nssPasswordFormAction } from '../pages/aisp/PgAISPPasswordForm';
import PgAISPDash, { loader as nssDashLoader } from '../pages/aisp/PgAISPDash';
import PgAISPFees,{ loader as aispFeesLoader } from '../pages/aisp/PgAISPFees';
import PgAISPRegistrations,{ loader as aispRegistrationsLoader } from '../pages/aisp/PgAISPRegistrations';
import PgAISPResults, { loader as aispResultsLoader } from '../pages/aisp/PgAISPResults';

import { useUserStore } from '../utils/authService';

const user = useUserStore.getState().user
const dricRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'dric')

const AISRoute:any =  {
   path: "aisp",
   element: <AISPLayout />,
   //action: chosenAction,
   children: [
      {  element: <AISPPager />,
         children: [
            {  
               path:'dash',
               element: <PgAISPDash />, 
               loader: null,
            }
         ] 
      },
      
      // Profile
      {  path:'profile', 
         element: <PgAISPProfile />,
         loader: aispProfileLoader,
         index:true
      },
      { 
         path:'profile/:profileId/edit', 
         element: <PgAISPProfileForm />, 
         loader: aispProfileFormLoader,
         action: aispProfileAction
      },

      // Notices
      {  path:'notices', 
         element: <PgAISPNotices />,
         loader: nssNoticesLoader,
      },
      { 
         path:'notices/:noticeId', 
         element: <PgAISPNotice />,
         loader: nssNoticeLoader
      },
      
      // Fees & Charges
      {  path:'fees', 
         element: <PgAISPFees />,
         loader: aispFeesLoader,
      },
      { 
         path:'fees/:noticeId', 
         element: <PgAISPNotice />,
         loader: nssNoticeLoader
      },

      // Results
      {  path:'results', 
         element: <PgAISPResults />,
         loader: aispResultsLoader,
      },
      // { 
      //    path:'results/:resultsId', 
      //    element: <PgAISPNotice />,
      //    loader: aispResultLoader
      // },
       // Results
      {  path:'registration', 
         element: <PgAISPRegistrations />,
         loader: aispRegistrationsLoader,
      },


      // Services
      {  path:'services', 
         element: <PgAISPServices />,
         loader: nssServicesLoader,
      },
      { 
         path:'services/:serviceId', 
         element: <PgAISPService />,
         loader: nssServiceLoader
      },
      { 
         path:'services/create', 
         element: <PgAISPServiceForm />,
         loader: nssServiceFormLoader,
         action: nssServiceFormAction
      },
      { 
         path:'services/:serviceId/edit/', 
         element: <PgAISPServiceForm />, 
         loader: nssServiceFormLoader,
         action: nssServiceFormAction
      },
      { 
         path:'services/:serviceId/destroy', 
         //action: lasRolesDestroy,
      },

      // Password Change
      {  path:'changepwd', 
         element: <PgAISPPasswordForm />,
         action: nssPasswordFormAction
      },
      

   ]
}

export default AISRoute