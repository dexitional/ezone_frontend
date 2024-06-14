import React, { useState } from 'react'
import PageTitle from '../../components/ais/PageTitle'
import Service from '../../utils/aisService'
import { redirect, useLoaderData } from 'react-router'
import DepartmentListView from '../../components/ais/DepartmentListView'

type Props = {}
export async function action({ params }) {
  // await Service.deleteRole(params.roleId);
  return redirect("/ais/departments");
}

export async function loader() {
  const data = await Service.fetchDepartments();
  return { data }
}

function PgAISDepartments({}: Props) {
  const { data }: any = useLoaderData()

  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle title="Departments" createtext="New" createlink="create" setView={()=> null} view={''} />
      <div className="">
        <DepartmentListView data={data} />
      </div>
    </div>
  )
}

export default PgAISDepartments