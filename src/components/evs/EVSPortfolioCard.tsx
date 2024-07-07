import React from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi';
import { Form, Link } from 'react-router-dom';
const { REACT_APP_API_URL } = import.meta.env;

type Props = {
    data?: any;
    title?: string;
    
}

function EVSPortfolioCard({ title,data }: Props) {
  return (
    <div className="w-full space-y-3 rounded">
    <h1 className="text-sm font-bold font-roboto tracking-wider text-primary-dark/60 flex flex-col md:flex-row  space-y-2 md:space-y-0 justify-between">
      <span className="px-3 py-0.5 rounded border border-primary/50">{title}</span>
      <div className='flex items-center justify-between space-x-3'>
        <Link to={`create`} className="px-3 py-0.5 w-fit rounded border-2 border-primary/70 text-xs text-primary/70 font-semibold flex items-center">CREATE</Link>
        <span className="px-3 py-0.5 w-fit rounded bg-primary/70 text-xs text-white font-bold flex items-center">{data?.length} POSITIONS</span>
      </div>
    </h1>
    <div className="w-full rounded-lg shadow-md text-xs overflow-x-scroll md:overflow-hidden">
          <div className="px-3 py-2 md:grid bg-primary/10 text-primary-dark/70 font-bold grid grid-cols-8 tracking-wider">
            <span className="hidden md:grid justify-self-center">NO</span>
            <span className="hidden md:grid col-span-3">TITLE</span>
            <span className="hidden md:grid justify-self-center">SELECTIONS</span>
            <span className="hidden md:grid justify-self-center">CANDIDATES</span>
            <span className="hidden md:grid justify-self-center">STATUS</span>
            <span className="hidden md:grid justify-self-center">ACTION</span>
          </div>
          { data?.map((row:any, i:number) => (
            <div className="px-3 py-2 border-b grid md:grid-cols-8 gap-y-3 font-medium text-xs text-primary/80">
              <span className="justify-self-center"><span className="md:hidden text-primary-dark text-[0.65rem]">CANDIDATE NO: </span>{i+1}</span>
              <span className="md:col-span-3 font-medium justify-self-center md:justify-self-start"><span className="md:hidden text-primary-dark text-[0.65rem]">TITLE:&nbsp; </span>{row?.title?.toUpperCase()} </span>
              <span className="justify-self-center text-sm"><span className="md:hidden text-primary-dark text-[0.65rem]">NUMBER OF CHOICES:&nbsp; </span>{row?.selectCount }</span>
              <span className="justify-self-center text-sm"><span className="md:hidden text-primary-dark text-[0.65rem]">CANDIDATES:&nbsp; </span>{(row?._count?.candidate > 0 ? row?._count?.candidate - 1 : 0) || 0 }</span>
              <span className="justify-self-center"><span className="md:hidden text-primary-dark text-[0.65rem]">STATUS:&nbsp; </span>{row.status ? 'ENABLED':'DISABLED'}</span>
              <span className="flex md:flex-row flex-col items-center md:justify-center space-y-3 md:space-y-0 md:space-x-2">
                  <Link to={`${row?.id}/edit?cache`} className='px-2 py-0.5 w-fit rounded border border-primary flex items-center'>
                    <BiEdit className="h-4 w-4" />
                  </Link>
                  { row?._count?.candidate <= 0 ?
                  <Form method="post" action={`${row?.id}/destroy`} onSubmit={(e)=> { if(!confirm("Do you want to delete")) e.preventDefault(); return false; }}>
                    <label className='px-2 py-0.5 w-fit rounded border border-primary flex items-center cursor-pointer'>
                      <button  type="submit"><BiTrash className="h-4 w-4" /></button>
                    </label>
                  </Form>
                  : null }
              </span>
            </div>
          ))}
          {/* Totals */}
          {/* <div className="px-3 py-2 border-b grid grid-cols-8 font-bold text-xs text-primary-accent/80">
            <span>&nbsp;</span>
            <span className="col-span-4 font-bold">CGPA:&nbsp;&nbsp;&nbsp;{ cgpa && cgpa[index] || 0 }</span>
            <span>GPA:&nbsp;&nbsp;&nbsp;{gpa?.toFixed(1)}</span>
            <span>TCR:&nbsp;&nbsp;&nbsp;{ credit?.toFixed(1) }</span>
            <span>TGP:&nbsp;&nbsp;&nbsp;{ gradepoint?.toFixed(1) }</span>
          </div> */}
    </div>
 </div>
  )
}

export default EVSPortfolioCard