import React from 'react'
import Service from '../../utils/evsService'
import { redirect, useLoaderData, useNavigate } from 'react-router';
import { Form } from 'react-router-dom';

type Props = {}

export async function action({ request, params }){
  const id = params?.portfolioId || 0;
  const formData = await request.formData()
  let data = Object.fromEntries(formData)
      data.electionId = Number(params.electionId);
      data.status = data.status == 1
    
  let resp;
   if(id != 0) 
     resp = await Service.updatePortfolio(id,data);
   else
     resp = await Service.postPortfolio(data);
  
   if(resp){
     return redirect(`../../portfolios`)
   }
} 

export async function loader({ params }){
   let data = { id: 0 };
   const id = params?.portfolioId || 0;
   if(id != 0)
     data = await Service.fetchPortfolio(id)
   return { data }
}

function PgEVSPortfolioForm({}: Props) {
  const { data } :any = useLoaderData();
  const navigate = useNavigate()
  
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center space-y-8 md:space-y-8 ">
       <div className="flex w-full flex-1 flex-col space-y-8 md:space-y-10 ">
          <div className="p-2 md:px-6 md:py-2 border bg-slate-50/50 rounded-xl space-y-3">
            <section className="flex md:space-x-6">
              <h1 className="text-sm md:text-lg tracking-wide font-semibold text-primary/70">{data?.id ? 'Update':'Create'} Portfolio</h1>
            </section>

            <Form method="post" className="">
                {/* Record */}
                <div className="p-3 border rounded-lg md:rounded-xl bg-white space-y-3 md:space-x-6">
                  <div className="p-3 grid md:grid-cols-3 gap-x-2 gap-y-3 md:gap-y-0 md:gap-x-4">
                      <label className="flex flex-col space-y-2">
                          <span className="text-sm md:text-base text-gray-500 font-medium">Portfolio title</span>
                          <input arial-label="title" name="title" defaultValue={data?.title} required className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md uppercase" />
                      </label>
                      <label className="flex flex-col space-y-2">
                          <span className="text-sm md:text-base text-gray-500 font-medium">Portfolio Status</span>
                          <select arial-label="status" name="status" defaultValue={Number(data?.status)} required className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md">
                            <option selected disabled>-- Choose --</option>
                            <option value="0">DISABLED</option>
                            <option value="1">ENABLED</option>
                          </select>
                      </label>
                      <div className="w-full flex md:flex-row items-end flex-col justify-end md:space-x-2 space-x-0 space-y-2">
                        <button className="py-2 px-4 md:w-40 w-full rounded-md bg-primary/70 text-white font-semibold" type="submit">SAVE</button>
                        <button onClick={() => { if(confirm('Cancel')) navigate(-1) }} className="py-2 px-4  md:w-20 w-full rounded-md  bg-slate-50 border text-sm text-gray-600" type="button">CANCEL</button>
                      </div>
                      
                  </div>
                </div>

            </Form>
            
          </div>
      </div>
    </div>
  )
}

export default PgEVSPortfolioForm