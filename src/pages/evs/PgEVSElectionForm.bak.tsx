import React, { useState } from 'react'
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import Service from '../../utils/evsService'
import moment from 'moment'
import toast from 'react-hot-toast'
import SubPageTitle from '../../components/evs/SubPageTitle'
const { REACT_APP_API_URL } = import.meta.env;


type Props = {}

// Save Form
export async function action({ request, params }){
   const id = params?.electionId || 0;
   const formData = await request.formData()
   const logo = formData.get('logo');
  if (logo?.size && !logo?.type?.match("image.*")) {
     toast("Please upload an image file only!",{ className:'text-red-400 font-semibold'});
     return false;
  } 
   let data = Object.fromEntries(formData)
       data.startAt = moment(data.startAt)
       data.endAt = moment(data.endAt)
       data.groupId = Number(data.groupId)
       data.logo = logo
       if(!logo?.size) delete data.logo;
      
       
    
   let resp;
    if(id != 0) 
      resp = await Service.updateElection(id,data);
    else
      resp = await Service.postElection(data);
   
    if(resp){
      return redirect(`/evs/admin/elections?cache=${Math.random()}`)
    }
} 

// Load Data of Single 
export async function loader({ params }){
   let data = { id: 0 };
  //  const countries = await Service.fetchCountries()
   
   const id = params?.electionId || 0;
   if(id != 0)
     data = await Service.fetchElection(id)
    console.log(data)
   return { data }
}

function PgEVSElectionForm({}: Props) {
  
  const navigate = useNavigate()
  const { data }: any = useLoaderData();
  const [ photo, setPhoto ] = useState(`${REACT_APP_API_URL}/auth/pixo/?eid=${data?.id}`)
 
  return (
    <main className="md:pl-10 p-2 md:p-6 space-y-4 md:space-y-10">
      <SubPageTitle title={`${data?.id ? 'Edit':'Create'} Election`} page="Election Info" />
      <div className="p-2 md:p-6 border bg-slate-50/50 rounded-xl space-y-6">
         <section className="flex md:space-x-6">
           <div className="flex-1 flex flex-col space-y-1 md:space-y-3">
              <h1 className="text-lg md:text-2xl tracking-wide font-semibold text-primary/70">{data?.id ? 'Edit':'Create'} Election</h1>
              <div className="flex items-center space-x-2 text-zinc-400 text-base">
                 <span className="text-xs md:text-base tracking-wider">Please provide neccessary information</span>
              </div>
            </div>
         </section>

         <Form method="post" encType="multipart/form-data" className="grid md:grid-cols-2 gap-y-2 md:gap-y-0 md:gap-x-4">
             {/* Record */}
             <div className="p-3 md:py-6 md:pb-10 md:px-6 border rounded-lg md:rounded-xl bg-white space-y-3 md:space-y-6">
               <h1 className="py-0.5 px-2 md:px-4 w-fit text-xs md:text-base font-semibold rounded-md bg-primary-dark/60 text-white tracking-widest uppercase -skew-x-6">General Information</h1>
               <div className="md:pl-6 space-y-4">
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Election Title</span>
                      <input arial-label="title" name="title" defaultValue={data?.title} required className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md" />
                  </label>
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Election Tag/Slug</span>
                      <input arial-label="tag" name="tag" defaultValue={data?.tag} className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md" />
                  </label>
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Election Type</span>
                      <select arial-label="type" name="type" defaultValue={data?.type} className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md">
                        <option selected disabled>-- Choose --</option>
                        <option value="GENERAL">GENERAL</option>
                        <option value="REFERENDUM">REFERENDUM</option>
                      </select>
                  </label>
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Electoral Group</span>
                      <select arial-label="groupId" name="groupId" defaultValue={Number(data?.groupId)} className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md">
                        <option selected disabled>-- Choose --</option>
                        <option value="1">STUDENT ELECTIONS</option>
                        <option value="2">STAFF ELECTIONS</option>
                      </select>
                  </label>
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Election Opens</span>
                      <input arial-label="startAt" name="startAt" type="datetime-local" defaultValue={moment(data?.startAt).format("YYYY-MM-DD HH:mm")} required className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md" />
                  </label>
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Election Closes</span>
                      <input arial-label="endAt" name="endAt" type="datetime-local" defaultValue={moment(data?.endAt).format("YYYY-MM-DD HH:mm")} required className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md" />
                  </label>
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Status</span>
                      <select arial-label="status" name="status" defaultValue={Number(data?.status)} className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md">
                        <option selected disabled>-- Choose --</option>
                        <option value="0">DISABLED</option>
                        <option value="1">ENABLED</option>
                      </select>
                  </label>
               </div>
             </div>

             <div className="p-3 md:py-6 md:pb-10 md:px-6 w-full border rounded-lg md:rounded-xl bg-white space-y-3 md:space-y-6">
               {/* <h1 className="py-0.5 px-4 w-fit text-base font-semibold rounded-md bg-blue-950/60 text-white tracking-widest uppercase -skew-x-6">SECURE PORTAL</h1> */}
               <h1 className="py-0.5 px-2 md:px-4 w-fit text-xs md:text-base font-semibold rounded-md bg-primary-dark/60 text-white tracking-widest uppercase -skew-x-6">Voters Information</h1>
               <div className="md:pl-6 space-y-4">
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Voter Register</span>
                      <textarea arial-label="voterList" name="voterList" defaultValue={JSON.stringify(data?.voterList)} rows={10} className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-xs font-semibold text-gray-500 rounded-md tracking-widest leading-8"></textarea>
                  </label>
                 
               </div>  
              
               <h1 className="py-0.5 px-2 md:px-4 w-fit text-xs md:text-base font-semibold rounded-md bg-primary-dark/60 text-white tracking-widest uppercase -skew-x-6">Logo Information</h1>
               <div className="md:pl-6 space-y-4">
                  {/* Logo Data */}
                  <div className="m-3 p-3 grid grid-cols-2 gap-x-3 rounded border">
                    <img src={photo} alt="" className="h-32 rounded" />
                    <label className="flex self-center w-28">
                        <input type="file" name="logo" onChange={(e:any) => setPhoto(URL.createObjectURL(e?.target?.files[0]))} className="file:px-3 file:bg-primary file:rounded file:text-white" />
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    {/* <input type="hidden" name="studentId" defaultValue={data?.id} /> */}
                    <button className="mr-4 py-1 px-4 w-4/5 rounded-md bg-primary/70 text-white font-semibold" type="submit">SAVE</button>
                    <button onClick={() => { if(confirm('Cancel')) navigate(-1) }} className="py-1 px-4 rounded-md  bg-slate-50 border text-sm text-gray-600" type="button">CANCEL</button>
                  </div>
                  
                </div>
             </div>
             
         </Form>
        
      </div>
    </main>
  )
}

export default PgEVSElectionForm