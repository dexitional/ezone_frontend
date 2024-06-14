import React, { useState } from 'react'
import SubPageTitle from '../../components/ams/SubPageTitle'
// @ts-ignore
import Logo from '../../assets/img/logo/mlk/logo.png'
import { Form, Link } from 'react-router-dom'
import Service from '../../utils/amsService'
import { Outlet, redirect, useLoaderData } from 'react-router'
import moment from 'moment'
import { TbEdit } from 'react-icons/tb'
import SubNavLink from '../../components/ais/SubNavLink'
import ReactHtml from "html-react-parser";
import { PiSignatureBold } from 'react-icons/pi'
import LetterTemplate from '../../components/ams/LetterTemplate'
import { HiAcademicCap } from 'react-icons/hi2'
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
import FormTemplate from '../../components/ams/FormTemplate'
import { useUserStore } from '../../utils/authService'

type Props = {}


// Delete Action for Phase
export async function action({ request }) {
  const { user } = useUserStore.getState() ?? null;
  const serial = user?.user?.tag;
  const formData = await request.formData();
  let data:any = {};
    data.submitted = true;
    data.submittedAt = moment();
    data.serial = serial;
    data.choiceId = formData.get('choiceId');
  console.log(data)
  let resp = await Service.saveStepReview(data);
  if(resp){
    return redirect('/amsp/dash')
  } return null
}

// Loader for Single Project
export async function loader({ params }){
  const { user, stepUrl } = useUserStore.getState() ?? null;
  const serial = user?.user?.tag
  const applicant = await Service.fetchApplicant(serial)
  const data = await Service.fetchApplicantPreview(serial)
  return { data,applicant }
}

function PgStepReview({}: Props) {

  const { data,applicant } :any = useLoaderData();
  console.log(data)

  const finalize = () => {

  }

  return (
    <main className="p-2">
      <div className="p-3 border bg-slate-50/50 rounded-xl space-y-4">
         <section className="relative flex space-x-2 md:space-x-6">
            <div className="relative p-2 w-full md:py-4 md:px-6 flex md:flex-row flex-col md:space-x-6 space-y-3 md:space-y-0 md:justify-between border rounded-md md:rounded-xl bg-slate-50">
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                  <Link to="/amsp/profile" className="px-4 py-2 bg-primary rounded-md text-white font-semibold">Edit Application Form</Link>
                  <Link to="/amsp/dash" className="px-4 py-2 bg-primary-accent/90 rounded-md text-white font-semibold">Save & Exit</Link>
              </div>
              <Form method="post" encType="multipart/form-data"  className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                  <button type="submit" className="px-4 py-2 bg-primary rounded-md text-white font-semibold">Finalize Application</button>
                  <input type="hidden" name="choiceId" value={data?.choice[0]?.id} />
              </Form>
            </div>
         </section>
         <section>
             <div className=" p-2 w-full md:w-full md:py-4 md:px-6 flex flex-col space-y-3 md:space-y-6 border rounded-md md:rounded-xl bg-white overflow-x-scroll">
                {/* <Outlet /> */}
                <FormTemplate data={{ applicant,data }}/>
             </div> 
         </section>
      </div>
    </main>
  )
}

export default PgStepReview