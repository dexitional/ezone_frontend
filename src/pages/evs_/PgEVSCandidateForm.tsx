import React, { useRef, useState } from 'react'
import Service from '../../utils/evsService'
import { redirect, useLoaderData, useNavigate } from 'react-router';
import { Form } from 'react-router-dom';
import toast from 'react-hot-toast';
const { REACT_APP_API_URL } = import.meta.env;
type Props = {}

export async function action({ request, params }){
  const id = params?.candidateId || 0;
  const formData = await request.formData()
  const photo = formData.get('photo');
  if (photo?.size && !photo?.type?.match("image.*")) {
     toast("Please upload an image file only!",{ className:'text-red-400 font-semibold'});
     return false;
  } 
  let data = Object.fromEntries(formData)
      data.portfolioId = Number(data.portfolioId);
      data.orderNo = Number(data.orderNo);
      data.photo = photo;
      data.status = data.status == 1
      if(!photo?.size) delete data.photo;
     
    
  let resp;
   if(id != 0) 
     resp = await Service.updateCandidate(id,data);
   else
     resp = await Service.postCandidate(data);
  
   if(resp){
     return redirect(`../../candidates`)
     //return true;
   }
} 

export async function loader({ params }){
   let data = { id: 0 };
   const portfolios = await Service.fetchPortfolioList(params?.electionId)
   const id = params?.candidateId || 0;
   if(id != 0)
     data = await Service.fetchCandidate(id)
    console.log(data)
   return { data,portfolios }
}

function PgEVSCandidateForm({}: Props) {
  const { data,portfolios } :any = useLoaderData();
  const [ photo, setPhoto ] = useState(`${REACT_APP_API_URL}/auth/pixo/?eid=${data?.portfolio?.electionId}&tag=${data?.id}`)
  const navigate = useNavigate()
  
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center space-y-8 md:space-y-8 ">
       <div className="flex w-full flex-1 flex-col space-y-8 md:space-y-10 ">
          <div className="p-2 md:px-6 md:py-2 border bg-slate-50/50 rounded-xl space-y-3">
            <section className="flex md:space-x-6">
              <h1 className="text-sm md:text-lg tracking-wide font-semibold text-primary/70">{data?.id ? 'Update':'Create'} Candidate</h1>
            </section>

            <Form method="post" encType="multipart/form-data" className="">
                {/* Record */}
                <div className="p-3 border rounded-lg md:rounded-xl bg-white space-y-3 md:space-x-6">
                  <div className="p-3 grid md:grid-cols-2 gap-x-2 gap-y-3 md:gap-y-0 md:gap-x-4">
                      <div className="m-3 p-3 grid grid-cols-3 rounded border">
                            <img src={photo} alt="" className="h-10 rounded" />
                            <label className="col-span-2 flex self-center w-28">
                                <input type="file" name="photo" onChange={(e:any) => setPhoto(URL.createObjectURL(e?.target?.files[0]))} className="file:px-3 file:bg-primary file:rounded file:text-white" />
                            </label>
                      </div>
                      <label className="flex flex-col space-y-2">
                          <span className="text-sm md:text-base text-gray-500 font-medium">Candidate Name</span>
                          <input arial-label="name" name="name" defaultValue={data?.name} required className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md uppercase" />
                      </label>
                      <label className="flex flex-col space-y-2">
                          <span className="text-sm md:text-base text-gray-500 font-medium">Teaser / Slogan</span>
                          <input arial-label="teaser" name="teaser" defaultValue={data?.teaser} className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md uppercase" />
                      </label>
                      <label className="flex flex-col space-y-2">
                          <span className="text-sm md:text-base text-gray-500 font-medium">Ballot Number</span>
                          <input arial-label="orderNo" name="orderNo" defaultValue={data?.orderNo} className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md uppercase" />
                      </label>
                      <label className="flex flex-col space-y-2">
                          <span className="text-sm md:text-base text-gray-500 font-medium">Portfolio</span>
                          <select arial-label="portfolioId" name="portfolioId" defaultValue={data?.portfolioId} required className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md">
                            <option selected disabled>-- Choose --</option>
                            { portfolios && portfolios?.map((row:any) =>(
                              <option key={row.id} value={row.id}>{row.title?.toUpperCase()}</option>
                            ))}
                          </select>
                      </label>
                      {/* <label className="flex flex-col space-y-2">
                          <span className="text-sm md:text-base text-gray-500 font-medium">Status</span>
                          <select arial-label="status" name="status" defaultValue={Number(data?.status)} required className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md">
                            <option selected disabled>-- Choose --</option>
                            <option value="0">DISABLED</option>
                            <option value="1">ENABLED</option>
                          </select>
                      </label> */}
                      <div className="w-full flex md:flex-row items-end flex-col justify-end md:space-x-2 space-x-0 space-y-2">
                        <input name="" type="hidden" />
                        <button className="py-2 px-4 w-full rounded-md bg-primary/70 text-white font-semibold" type="submit">SAVE</button>
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

export default PgEVSCandidateForm