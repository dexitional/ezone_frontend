import React from 'react'
import Service from '../../utils/evsService'
import { redirect, useLoaderData } from 'react-router';
import { BsActivity } from 'react-icons/bs';
import EVSPortfolioCard from '../../components/evs/EVSPortfolioCard';
import { Form } from 'react-router-dom';

type Props = {}

export async function action({ params }) {
  await Service.deletePortfolio(params.portfolioId);
  return redirect(`../../portfolios`)
}

export async function loader({ params }){
   const data = await Service.fetchPortfolios(params.electionId);
   return { data }
}

function PgEVSPortfolios({}: Props) {
  const { data } :any = useLoaderData();
  console.log(data)
  
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center space-y-8 md:space-y-8 ">
       <div className="flex w-full flex-1 flex-col space-y-8 md:space-y-10 ">
          { data && (
            <EVSPortfolioCard title={data && data[0]?.election?.type == 'GENERAL' ? 'PORTFOLIOS':'ISSUES'} data={data} />
          )}
          { !data.length ? (
              <div className="p-10 border border-primary/10 rounded-xl flex flex-col items-center justify-center space-y-3">
                <BsActivity className="h-20 w-20 text-primary/30 border rounded-md" />
                <span className="text-primary/40 font-medium">No Records ...</span>
              </div>
          ) : null}

      </div>
    </div>
  )
}

export default PgEVSPortfolios