import React from 'react'
import { useUserStore } from '../utils/authService';
import AMSPLayout from '../components/amsp/AMSPLayout';
import PgAMSPDash from '../pages/amsp/PgAMSPDash';
import AMSPSwitcher, { loader as switchLoader } from '../components/amsp/AMSPSwitcher';
import PgStepConfigure, { loader as stepConfigureLoader,action as stepConfigureAction     } from '../pages/amsp/PgStepConfigure';
import PgStepProfile, { loader as stepProfileLoader, action as stepProfileAction } from '../pages/amsp/PgStepProfile';
import PgStepGuardian, { loader as stepGuardianLoader, action as stepGuardianAction } from '../pages/amsp/PgStepGuardian';
import PgStepEducation, { loader as stepEducationLoader, action as stepEducationAction } from '../pages/amsp/PgStepEducation';
import PgStepResult, { loader as stepResultLoader, action as stepResultAction } from '../pages/amsp/PgStepResult';
import PgStepChoice, { loader as stepChoiceLoader, action as stepChoiceAction } from '../pages/amsp/PgStepChoice';
import PgStepDocument, { loader as stepDocumentLoader, action as stepDocumentAction } from '../pages/amsp/PgStepDocument';
import PgStepReview, { loader as stepReviewLoader, action as stepReviewAction } from '../pages/amsp/PgStepReview';
import PgStepPrintForm from '../pages/amsp/PgStepPrintForm';
import PgStepPrintLetter, { loader as stepPrintLetterLoader } from '../pages/amsp/PgStepPrintletter';

const user = useUserStore.getState().user
// const dricRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'dric')

const AMSPRoute:any =  { 
   path: "amsp",
   element: <AMSPLayout />,
   children: [
      { 
        element: <AMSPSwitcher />,
        loader: switchLoader,
        children: [
          {  path:"dash",
             element: <PgStepConfigure />, 
             loader: stepConfigureLoader,
             action: stepConfigureAction,
             children: [
               {
                // element: <PgStepNotice />, 
                // loader: stepNoticeLoader,
                index: true
               },
               {
                path:'form',
                element: <PgStepPrintForm />, 
                loader: stepReviewLoader,
               },
               {
                path:'letter',
                element: <PgStepPrintLetter />, 
                loader: stepPrintLetterLoader,
               }
             ]
             
          },
          {  
            path:'profile',
            element: <PgStepProfile />, 
            loader: stepProfileLoader,
            action: stepProfileAction,
          },
          {  
            path:'guardian',
            element: <PgStepGuardian />, 
            loader: stepGuardianLoader,
            action: stepGuardianAction,
          },
          {  
            path:'education',
            element: <PgStepEducation />, 
            loader: stepEducationLoader,
            action: stepEducationAction,
          },
          {  
            path:'result',
            element: <PgStepResult />, 
            loader: stepResultLoader,
            action: stepResultAction,
          },
          {  
            path:'referee',
            element: <PgAMSPDash />, 
            loader: null,
          },
          {  
            path:'document',
            element: <PgStepDocument />, 
            loader: stepDocumentLoader,
            action: stepDocumentAction,
          },
          {  
            path:'choice',
            element: <PgStepChoice />, 
            loader: stepChoiceLoader,
            action: stepChoiceAction,
          },
          {  
            path:'employment',
            element: <PgAMSPDash />, 
            loader: null,
          },
          {  
            path:'review',
            element: <PgStepReview />, 
            loader: stepReviewLoader,
            action: stepReviewAction,
          }
        ] 
      },
      
   ]
}

export default AMSPRoute