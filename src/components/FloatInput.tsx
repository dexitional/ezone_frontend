import React from 'react'

type Props = {
    label: string;
    otherProps?: any;
    type?: string;
    name?: string;
    value?: string;
    onChange: (args: any) => void
}

export default function FloatInput({ label, type, name, value, onChange }: Props) {
  return (
    <div className="relative h-14 flex items-center border border-gray-500/80 font-poppins tracking-widest group rounded">
        <input type={type} name={name} value={value} onChange={onChange} className="text-sm w-full border-none ring-0 outline-0 focus:border-0 focus:ring-0 focus:-mb-3 peer transition-all delay-300" placeholder={label} />
        <span className="absolute top-2 left-[0.78rem] text-xs text-gray-500/80 peer-placeholder-shown:hidden peer-focus-within:top-1.5 transition-all delay-300 tracking-tight">{label}</span>
    </div>
  )
}