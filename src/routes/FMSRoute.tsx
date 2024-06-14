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
import PgAMSShortlists, { loader as shortlistsLoader, action as amsShortlistDestroy } from '../pages/ams/PgAMSShortlists';
import PgAMSShortlist, { loader as shortlistLoader } from '../pages/ams/PgAMSShortlist';
import PgAMSShortlistForm, { loader as amsShortlistFormLoader, action as amsShortlistFormAction } from '../pages/ams/PgAMSShortlistForm';
import PgAMSMatriculants, { loader as matriculantsLoader, action as amsMatriculantDestroy } from '../pages/ams/PgAMSMatriculants';
import PgAMSMatriculant, { loader as amsMatriculantLoader } from '../pages/ams/PgAMSMatriculant';
import FMSLayout from '../components/fms/FMSLayout';
import PgFMSAccounts, { loader as accountsLoader } from '../pages/fms/PgFMSAccounts';
import PgFMSDebts, { loader as debtsLoader } from '../pages/fms/PgFMSDebts';
import PgFMSPayments, { loader as paymentsLoader } from '../pages/fms/PgFMSPayments';
import PgFMSTransacts, { loader as transactsLoader } from '../pages/fms/PgFMSTransacts';
import PgFMSBills, { loader as billsLoader, action as billsDestroy } from '../pages/fms/PgFMSBills';
import PgFMSBillForm, { loader as billFormLoader, action as billFormAction } from '../pages/fms/PgFMSBillForm';
import PgFMSBill, { loader as billLoader, action as billAction } from '../pages/fms/PgFMSBill';
import PgFMSBillReceiver, { loader as fmsReceiverLoader } from '../pages/fms/PgFMSBillReceiver';
import PgFMSBillActivity, { loader as  fmsActivityLoader } from '../pages/fms/PgFMSBillActivity';
import PgFMSBillAccount, { loader as  fmsActionLoader } from '../pages/fms/PgFMSBillAccount';

const user = useUserStore.getState().user
const fmsRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'fms')
  
const FMSRoute:any =  { 
   path: "fms",
   element: <FMSLayout />,
   // action: chosenAction,
   children: [
      /* Student Bills Module */
      { 
         path:'bills', 
         element: <PgFMSBills />,
         loader: billsLoader,
         //index: true
      },
      { 
         path:'bills/:billId', 
         element: <PgFMSBill />,
         loader: billLoader,
         children: [
            {
               path:'actions', 
               element: <PgFMSBillAccount />,
               loader: fmsActionLoader,
               index: true
            },
            {
               path:'receivers', 
               element: <PgFMSBillReceiver />,
               loader: fmsReceiverLoader,
            },
            {
               path:'activity', 
               element: <PgFMSBillActivity />,
               loader: fmsActivityLoader,
            }
         ]
      },
      { 
         path:'bills/create', 
         element: <PgFMSBillForm />,
         loader: billFormLoader,
         action: billFormAction
      },
      { 
         path:'bills/:billId/destroy', 
         action: billsDestroy,
      },
      { 
         path:'bills/:billId/edit', 
         element: <PgFMSBillForm />, 
         loader: billFormLoader,
         action: billFormAction
      },


      /* Student Charges Module */
      { 
         path:'charges', 
         element: <PgAMSLetters />,
         loader: lettersLoader,
      },
      { 
         path:'charges/create', 
         element: <PgAMSLetterForm />,
         loader: amsLetterFormLoader,
         action: amsLetterFormAction
      },
      { 
         path:'charges/:chargeId', 
         element: <PgAMSLetter />,
         loader: amsLetterLoader,
      },
      { 
         path:'charges/:chargeId/destroy', 
         action: amsLetterDestroy,
      },
      { 
         path:'charges/:chargeId/edit', 
         element: <PgAMSLetterForm />, 
         loader: amsLetterFormLoader,
         action: amsLetterFormAction
      },

      /* Student Accounts Module */
      { 
         path:'accounts', 
         element: <PgFMSAccounts />,
         loader: accountsLoader,
         index: true
      },
      { 
         path:'accounts/:accountId/retire', 
         action: amsVoucherRecover,
      },
      { 
         path:'accounts/:accountId/fine', 
         action: amsVoucherRecover,
      },

      /* Student Debtors Module */
      { 
         path:'debtors', 
         element: <PgFMSDebts />,
         loader: debtsLoader,
      },
      
      /* Fees Payments Module */
      { 
         path:'payments', 
         element: <PgFMSPayments />,
         loader: paymentsLoader,
      },
      { 
         path:'payments/create', 
         element: <PgAMSShortlistForm />,
         loader: amsShortlistFormLoader,
         action: amsShortlistFormAction
      },
      { 
         path:'payments/:paymentId', 
         element: <PgAMSShortlist />,
         loader: shortlistLoader,
      },
      { 
         path:'payments/:paymentId/destroy', 
         action: amsShortlistDestroy,
      },
      { 
         path:'payments/:paymentId/process', 
         element: <PgAMSShortlistForm />, 
         loader: amsShortlistFormLoader,
         action: amsShortlistFormAction
      },

       /* Other Payments Module */
       { 
         path:'transacts', 
         element: <PgFMSTransacts />,
         loader: transactsLoader,
      },
      { 
         path:'transacts/:transactId', 
         element: <PgAMSMatriculant />,
         loader: amsMatriculantLoader,
      },
      { 
         path:'transacts/:transactId/destroy', 
         action: amsMatriculantDestroy,
      },

      /* Service Costs Module */
      { 
         path:'services', 
         element: <PgAMSMatriculants />,
         loader: matriculantsLoader,
      },
      { 
         path:'services/:serviceId', 
         element: <PgAMSMatriculant />,
         loader: amsMatriculantLoader,
      },
      { 
         path:'services/:serviceId/destroy', 
         action: amsMatriculantDestroy,
      },

      /* Voucher Costs Module */
      { 
         path:'vcosts', 
         element: <PgAMSMatriculants />,
         loader: matriculantsLoader,
      },
      { 
         path:'vcosts/:costId', 
         element: <PgAMSMatriculant />,
         loader: amsMatriculantLoader,
      },
      { 
         path:'vcosts/:costId/destroy', 
         action: amsMatriculantDestroy,
      },

      /* Voucher Sales Module */
      { 
         path:'vsales', 
         element: <PgAMSMatriculants />,
         loader: matriculantsLoader,
      },
      { 
         path:'vsales/:saleId', 
         element: <PgAMSMatriculant />,
         loader: amsMatriculantLoader,
      },
      { 
         path:'vsales/:saleId/destroy', 
         action: amsMatriculantDestroy,
      }
   ]
}

export default FMSRoute