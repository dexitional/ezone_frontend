import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../utils/authService';
import AMSLayout from '../components/ams/AMSLayout';
import PgAMSSessions, { loader as sessionsLoader, action as amsSessionDestroy } from '../pages/ams/PgAMSSessions';
import PgAMSSessionForm, { loader as amsSessionFormLoader, action as amsSessionFormAction } from '../pages/ams/PgAMSSessionForm';
import PgAMSLetters, { loader as lettersLoader, action as amsLetterDestroy } from '../pages/ams/PgAMSLetters';
import PgAMSLetter, { loader as amsLetterLoader } from '../pages/ams/PgAMSLetter';
import PgAMSLetterForm, { loader as amsLetterFormLoader, action as amsLetterFormAction } from '../pages/ams/PgAMSLetterForm';
import PgAMSVouchers, { loader as vouchersLoader, action as amsVoucherRecover } from '../pages/ams/PgAMSVouchers';
import PgAMSVoucherForm, { loader as amsVoucherFormLoader, action as amsVoucherFormAction } from '../pages/ams/PgAMSVoucherForm';
import PgAMSVoucherSellForm, { loader as amsVoucherSellFormLoader, action as amsVoucherSellFormAction } from '../pages/ams/PgAMSVoucherSellForm';
import PgAMSApplicants, { loader as applicantsLoader, action as amsApplicantDestroy } from '../pages/ams/PgAMSApplicants';
import PgAMSApplicantForm, { loader as amsApplicantFormLoader, action as amsApplicantFormAction } from '../pages/ams/PgAMSApplicantForm';
import PgAMSApplicant, { loader as applicantLoader, action as amsApplicantShortlist } from '../pages/ams/PgAMSApplicant';
import PgAMSShortlists, { loader as shortlistsLoader, action as amsShortlistDestroy } from '../pages/ams/PgAMSShortlists';
import PgAMSShortlist, { loader as shortlistLoader } from '../pages/ams/PgAMSShortlist';
import PgAMSShortlistForm, { loader as amsShortlistFormLoader, action as amsShortlistFormAction } from '../pages/ams/PgAMSShortlistForm';
import PgAMSMatriculants, { loader as matriculantsLoader, action as amsMatriculantDestroy } from '../pages/ams/PgAMSMatriculants';
import PgAMSMatriculant, { loader as amsMatriculantLoader } from '../pages/ams/PgAMSMatriculant';

const user = useUserStore.getState().user
const amsRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'ams')
  
const AMSRoute:any =  { 
   path: "ams",
   element: <AMSLayout />,
   // action: chosenAction,
   children: [
      /* Admission Session Module */
      { 
         path:'sessions', 
         element: <PgAMSSessions />,
         loader: sessionsLoader,
         index: true
      },
      { 
         path:'sessions/create', 
         element: <PgAMSSessionForm />,
         loader: amsSessionFormLoader,
         action: amsSessionFormAction
      },
      { 
         path:'sessions/:sessionId/destroy', 
         action: amsSessionDestroy,
      },
      { 
         path:'sessions/:sessionId/edit', 
         element: <PgAMSSessionForm />, 
         loader: amsSessionFormLoader,
         action: amsSessionFormAction
      },


      /* Admission Letter Module */
      { 
         path:'letters', 
         element: <PgAMSLetters />,
         loader: lettersLoader,
      },
      { 
         path:'letters/create', 
         element: <PgAMSLetterForm />,
         loader: amsLetterFormLoader,
         action: amsLetterFormAction
      },
      { 
         path:'letters/:letterId', 
         element: <PgAMSLetter />,
         loader: amsLetterLoader,
      },
      { 
         path:'letters/:letterId/destroy', 
         action: amsLetterDestroy,
      },
      { 
         path:'letters/:letterId/edit', 
         element: <PgAMSLetterForm />, 
         loader: amsLetterFormLoader,
         action: amsLetterFormAction
      },

      /* Vouchers Module */
      { 
         path:'vouchers', 
         element: <PgAMSVouchers />,
         loader: vouchersLoader,
      },
      { 
         path:'vouchers/create', 
         element: <PgAMSVoucherForm />,
         loader: amsVoucherFormLoader,
         action: amsVoucherFormAction
      },
      { 
         path:'vouchers/:voucherId/sell', 
         element: <PgAMSVoucherSellForm />, 
         loader: amsVoucherSellFormLoader,
         action: amsVoucherSellFormAction
      },
      { 
         path:'vouchers/:voucherId/recover', 
         action: amsVoucherRecover,
      },
      { 
         path:'vouchers/:voucherId/reset', 
         action: amsVoucherRecover,
      },

      /* Applicant Module */
      { 
         path:'applicants', 
         element: <PgAMSApplicants />,
         loader: applicantsLoader,
      },
      { 
         path:'applicants/create', 
         element: <PgAMSApplicantForm />,
         loader: amsApplicantFormLoader,
         action: amsApplicantFormAction
      },
      { 
         path:'applicants/:applicantId', 
         element: <PgAMSApplicant />,
         loader: applicantLoader,
      },
      { 
         path:'applicants/:applicantId/shortlist', 
         action: amsApplicantShortlist,
      },
      { 
         path:'applicants/:applicantId/edit', 
         element: <PgAMSApplicantForm />, 
         loader: amsApplicantFormLoader,
         action: amsApplicantFormAction
      },


      /* Shortlist Module */
      { 
         path:'shortlists', 
         element: <PgAMSShortlists />,
         loader: shortlistsLoader,
      },
      { 
         path:'shortlists/create', 
         element: <PgAMSShortlistForm />,
         loader: amsShortlistFormLoader,
         action: amsShortlistFormAction
      },
      { 
         path:'shortlists/:shortlistId', 
         element: <PgAMSShortlist />,
         loader: shortlistLoader,
      },
      { 
         path:'shortlists/:shortlistId/destroy', 
         action: amsShortlistDestroy,
      },
      { 
         path:'shortlists/:shortlistId/process', 
         element: <PgAMSShortlistForm />, 
         loader: amsShortlistFormLoader,
         action: amsShortlistFormAction
      },

       /* Matriculants Module */
       { 
         path:'matriculants', 
         element: <PgAMSMatriculants />,
         loader: matriculantsLoader,
      },
      { 
         path:'matriculants/:matriculantId', 
         element: <PgAMSMatriculant />,
         loader: amsMatriculantLoader,
      },
      { 
         path:'matriculants/:matriculantId/destroy', 
         action: amsMatriculantDestroy,
      }
   ]
}

export default AMSRoute