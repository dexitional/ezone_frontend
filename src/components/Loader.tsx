import React from 'react'
import { BiLoaderCircle } from 'react-icons/bi'

type Props = {}

function Loader({}: Props) {
  return (
    <div className="z-20 fixed top-0 left-0 h-screen w-full bg-primary/20 backdrop-blur-[1px] bg-opacity-5 flex items-start justify-center">
    {/* <div className="z-20 fixed top-0 left-0 h-screen w-full bg-white opacity-50 flex items-start justify-center"> */}
        <BiLoaderCircle className="p-1 mt-[35vh] h-12 w-12 bg-white shadow shadow-primary-accent/40 rounded-full text-primary-accent/60 animate-spin" />
    </div>
  )
}

export default Loader