import React from 'react'

type Props = {
    data?: any;
    title?: string;
    index: number;
    cgpa?: any
}

function AISResultCard({ title,data,index,cgpa }: Props) {

  let credit = data.reduce((sum,cur) => cur.credit+sum, 0);
  let gradepoint = data.reduce((sum,cur) => (cur.credit*cur.gradepoint)+sum,0);
  let gpa = gradepoint/credit;
  console.log(cgpa)
 
  return (
    <div className="w-full space-y-3 rounded">
    <h1 className="text-sm font-bold font-roboto tracking-wider text-primary-dark/60 flex flex-col md:flex-row justify-between">
      <span>{title}</span>
      <span className="px-3 py-0.5 bg-primary/70 text-xs text-white font-bold">LEVEL {data && (Math.ceil(data[0].semesterNum/2) * 100) || 'NONE'}</span>
    </h1>
    <div className="w-full rounded-lg shadow-md text-xs overflow-x-scroll md:overflow-hidden">
          <div className="px-3 py-2 bg-primary/10 text-primary-dark/70 font-bold grid grid-cols-8 tracking-wider">
            <span >CODE</span>
            <span className="col-span-4">COURSE</span>
            <span>CH</span>
            <span>GRADE</span>
            <span>GPT</span>
          </div>
          { data.map((row:any) => (
            <div className="px-3 py-2 border-b grid grid-cols-8 font-medium text-xs text-primary/80">
              <span className="font-bold">{row.courseId}</span>
              <span className="col-span-4 font-medium">{row.course?.title}</span>
              <span>{row.credit}</span>
              <span>{row.grade}</span>
              <span>{(row.gradepoint * row.credit).toFixed(1)}</span>
            </div>
          ))}
          {/* Totals */}
          <div className="px-3 py-2 border-b grid grid-cols-8 font-bold text-xs text-primary-accent/80">
            <span>&nbsp;</span>
            <span className="col-span-4 font-bold">CGPA:&nbsp;&nbsp;&nbsp;{ cgpa && cgpa[index] || 0 }</span>
            <span>GPA:&nbsp;&nbsp;&nbsp;{gpa?.toFixed(1)}</span>
            <span>TCH:&nbsp;&nbsp;&nbsp;{ credit?.toFixed(1) }</span>
            <span>TGP:&nbsp;&nbsp;&nbsp;{ gradepoint?.toFixed(1) }</span>
          </div>
    </div>
 </div>
  )
}

export default AISResultCard