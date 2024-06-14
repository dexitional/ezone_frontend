import React from 'react'
import EVSDashPage, { loader as dashLoader } from '../pages/evs/EVSDashPage';
import EVSPage, { loader as pageLoader } from '../pages/evs/EVSPage';
import { useUserStore } from '../utils/authService';
import PgResult from '../components/evs/PgResult';
import PgControl from '../components/evs/PgControl';
import PgCandidate,{ loader as candiateLoader} from '../components/evs/PgCandidate';
import PgRegister, { loader as registerLoader } from '../components/evs/PgRegister';
import PgPublic from '../components/evs/PgPublic';
import PgStrongroom from '../components/evs/PgStrongroom';
import EVSLayout from '../components/evs/EVSLayout';
import PgVoting from '../components/evs/PgVoting';
import EVSAdminLayout from '../components/evs/EVSAdminLayout';
import PgEVSElections, { loader as adminElectionsLoader } from '../pages/evs/PgEVSElections';
import PgEVSElectionForm, { loader as evsElectionFormLoader, action as evsElectionFormAction } from '../pages/evs/PgEVSElectionForm';
import PgEVSElection, { loader as adminElectionLoader } from '../pages/evs/PgEVSElection';
import PgEVSPortfolios, { loader as evsPortfoliosLoader, action as evsPortfolioDestroy } from '../pages/evs/PgEVSPortfolios';
import PgEVSCandidates, { loader as evsCandidatesLoader, action as evsCandidateDestroy } from '../pages/evs/PgEVSCandidates';
import PgEVSPortfolioForm, { loader as evsPortfolioFormLoader, action as  evsPortfolioActionLoader } from '../pages/evs/PgEVSPortfolioForm';
import PgEVSCandidateForm, { loader as evsCandidateFormLoader, action as  evsCandidateActionLoader } from '../pages/evs/PgEVSCandidateForm';
import PgEVSVoters from '../pages/evs/PgEVSVoters';
import PgAdminControl from '../components/evs/PgAdminControl';

const user = useUserStore.getState().user
const evsRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'evs')

const EVSRoute:any =  {
   path: "evs",
   element: <EVSLayout />,
   //action: chosenAction,
   children: [
      // Dashboard
      {  path:'dash', 
         element: <EVSDashPage />,
         loader: dashLoader,
         index:true
      },
      
      // Election Portal
      {  path:':electionId',
         element: <EVSPage />,
         loader: pageLoader,
         children: [
            {  
               path:'vip',
               element: <PgStrongroom />, 
               loader: candiateLoader,
            },
            {  
               path:'public',
               element: <PgPublic />, 
               loader: candiateLoader,
            },
            {  
               path:'register',
               element: <PgRegister />, 
               loader: registerLoader,
               index: true
            },
            {  
               path:'candidate',
               element: <PgCandidate />, 
               loader: candiateLoader,
            },
            {  
               path:'control',
               element: <PgControl />, 
               loader: pageLoader,
            },
            {  
               path:'result',
               element: <PgResult />, 
               loader: candiateLoader,
            },
            
            // Voting Simulation
            {  path:'voting', 
               element: <PgVoting />,
               loader: candiateLoader,
            },
         ] 
      },

      // Election Admin
      {  path:'admin',
         element: <EVSAdminLayout />,
         loader: pageLoader,
         children: [
            {  
               path:'elections',
               element: <PgEVSElections />, 
               loader: adminElectionsLoader,
            },
            { 
               path:'elections/create', 
               element: <PgEVSElectionForm />,
               loader: evsElectionFormLoader,
               action: evsElectionFormAction
            },
            {  
               path:'elections/:electionId',
               element: <PgEVSElection />, 
               loader: adminElectionLoader,
               children: [
                  {
                     path:'portfolios', 
                     children: [
                        // Portfolios
                        {
                           element: <PgEVSPortfolios />,
                           loader: evsPortfoliosLoader,
                           index: true
                        },
                        {
                           path:':portfolioId/edit', 
                           element: <PgEVSPortfolioForm />,
                           loader: evsPortfolioFormLoader,
                           action: evsPortfolioActionLoader
                        },
                        {
                           path:'create', 
                           element: <PgEVSPortfolioForm />,
                           loader: evsPortfolioFormLoader,
                           action: evsPortfolioActionLoader
                        },
                        { 
                           path:':portfolioId/destroy', 
                           action: evsPortfolioDestroy,
                        },
                     ]
                  },
                  {
                     path:'candidates', 
                     children: [
                        {
                           element: <PgEVSCandidates />,
                           loader: evsCandidatesLoader,
                           index: true
                        },
                        {
                           path:'create', 
                           element: <PgEVSCandidateForm />,
                           loader: evsCandidateFormLoader,
                           action: evsCandidateActionLoader
                        },
                        {
                           path:':candidateId/edit', 
                           element: <PgEVSCandidateForm />,
                           loader: evsCandidateFormLoader,
                           action: evsCandidateActionLoader
                        },
                        { 
                           path:':candidateId/destroy', 
                           action: evsCandidateDestroy,
                        },
                     ]
                  },
                  { 
                     path:'voters', 
                     element: <PgRegister />, 
                     loader: registerLoader,
                  },
                  {  
                     path:'controls',
                     element: <PgAdminControl />, 
                     loader: pageLoader,
                  },
                  {  
                     path:'stage',
                     element: <PgCandidate />, 
                     loader: candiateLoader,
                  },
                  
                  {  
                     path:'results',
                     element: <PgResult />, 
                     loader: candiateLoader,
                  },
                
               ]
            },
            { 
               path:'elections/:electionId/edit', 
               element: <PgEVSElectionForm />, 
               loader: evsElectionFormLoader,
               action: evsElectionFormAction
            },
            { 
               path:'elections/:electionId/destroy', 
               action: evsCandidateDestroy,
            }
            
         ] 
      },
   ]
}

export default EVSRoute