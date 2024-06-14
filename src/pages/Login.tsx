import React, { useEffect, useState } from 'react'
// @ts-ignore
// import Logo from '../assets/img/logo_portalbr_.png'
import Logo from '../assets/img/logo_sso.png'
// @ts-ignore
// import Adinkra from '../assets/img/adinkra-bullet.png'
import Adinkra from '../assets/img/logo/mlk/logo.png'
import Adinkra2 from '../assets/img/adinkra-bullet.png'
// @ts-ignore
import SafeGuard from '../assets/img/icon-national-id.png'
import { FcGoogle, FcLock, FcSupport } from 'react-icons/fc';
import { FaArrowLeft, FaLinkedin, FaLock, FaLockOpen } from 'react-icons/fa';
import { MdWarning } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
// import { useAuth } from '../utils/authService';
import { GoogleLogin } from 'react-google-login'
import { useUserStore } from '../utils/authService';
import { PiStudentBold } from "react-icons/pi";
// @ts-ignore
const { REACT_APP_GOOGLE_CLIENT_ID } = import.meta.env;

function Login() {
  const navigate = useNavigate();
  //const { withCredential,withGoogle,isLoading,message,user,isAuthenticated } = useAuth();
  const { withCredential,withGoogle, message, user,isAuthenticated } = useUserStore(state => state);
  const [ form,setForm ] =  useState({ username: '', password: '' })
  const [ showStudentForm,setShowStudentForm ] =  useState(false)
  const [ showSSOForm,setShowSSOForm ] =  useState(false)
  const [ showVoucherForm,setShowVoucherForm ] =  useState(false)

  useEffect(() => {
    setForm({ username: '', password: '' })
  },[showStudentForm,showSSOForm,showVoucherForm])

  const onChange = (e) => {
     e.preventDefault();
     setForm({ ...form, [e.target.name]:e.target.value })
  }

  const authenticateCredential = async (e) => {
     try {
       e.preventDefault();
       const { username,password } = form;
       await withCredential(username,password);
      //  if(user?.user?.group_id == 1){
      //    navigate('/aisp',{ replace: true })
      //  } else if(user?.user?.group_id == 3){
      //    navigate('/dash',{ replace: true })
      //  } else {
      //    navigate('/dash',{ replace: true })
      //  }
      navigate("/")
    } catch (error) {
      console.log(error)
      
    }
  }

  const authenticateGoogle = async (response) => {
    try {
      const { profileObj:profile } = response;
      if(profile){
         await withGoogle(profile.googleId,profile.email)
         navigate('/dash',{ replace: true })
      }
    } catch(e){
      console.log(e)
    }
  }

  const errorGoogle = async (response) => {
    // const { type } = response;
    // if(type == 'error') {
    //    console.log(response)
    // }
  }

  // useEffect(() => {
  //    if(isAuthenticated()) navigate('/dash')
  // },[])
  
  return (
    <div className="w-full h-full bg-primary">
      <main className="mx-auto h-screen w-full md:max-w-7xl flex flex-col justify-center md:flex-row">
        <section className="md:py-8 flex-1 hidden md:flex flex-col items-start justify-start md:space-y-28">
            <div>
                {/* <img src={Logo} alt="" className="h-[6.5rem]"/> */}
                <img src={Logo} alt="" className="h-[6.5rem]"/>
            </div>
            <div className="pl-10 text-white space-y-10">
                <h2 className="px-4 py-0.5 text-[1.1rem] font-bold rounded-md bg-primary-dark/70 text-slate-50 tracking-wider">All Services in One location for Easy access.</h2>
                <ul className="space-y-4 text-white">
                    <li className="flex items-center space-x-4">
                        <img src={Adinkra2} alt="" className="h-4"/>
                        <span className="text-[1.1rem] font-semibold">Easy access to Admission Management System.</span>
                    </li>
                    <li className="flex items-center space-x-4">
                        <img src={Adinkra2} alt="" className="h-4"/>
                        <span className="text-[1.1rem] font-semibold">Easy access to Academic Management System.</span>
                    </li>
                    <li className="flex items-center space-x-4">
                        <img src={Adinkra2} alt="" className="h-4"/>
                        <span className="text-[1.1rem] font-semibold">Easy access to Financial Management System.</span>
                    </li>
                    <li className="flex items-center space-x-4">
                        <img src={Adinkra2} alt="" className="h-4"/>
                        <span className="text-[1.1rem] font-semibold">Easy access to Student Portal Services.</span>
                    </li>
                    
                   {/* <li className="flex items-center space-x-2">
                        <img src={Adinkra} alt="" className="h-4"/>
                        <span className="text-[1.2rem] font-bold">Easy access to Helpdesk & Support Management Services.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <img src={Adinkra} alt="" className="h-4"/>
                        <span className="text-[1.2rem] font-bold">Easy access to UCC Artificial Intelligence ( AI )</span>
                    </li> */}
                </ul>
            </div>
        </section>
        <section className="mx-2 my-1 py-2 shadow rounded-t-xl border-[3px] border-primary/20 backdrop-blur-lg bg-primary-dark/50 bg-[url('./assets/img/eagle.png')] bg-no-repeat bg-bottom flex md:hidden items-center justify-center">
           <img src={Logo} alt="" className="h-10 w-fit"/>
        </section>
        <section className="m-2 my-1 md:my-10 md:mx-4 md:w-[28rem] rounded-b-xl md:rounded-xl border-[3px] border-primary-dark/20 backdrop-blur-lg bg-primary bg-[url('./assets/img/eagle.png')] bg-no-repeat bg-bottom flex flex-col justify-between overflow-y-scroll scrollbar-hide">
            <div className="p-6 flex-1 flex flex-col items-center">
                <h1 className="my-4 md:my-10 text-3xl md:text-4xl text-white">Unified Portal</h1>
                <img src={SafeGuard} alt="" className="h-20 md:h-24" />
                <div className="my-6 md:my-14 w-full space-y-8">
                    {/* Message */}
                    <div className={`${message ? 'flex':'hidden'} p-3 md:p-4 mx-auto md:w-[90%] md:space-x-4 shadow rounded-lg backdrop-blur-sm bg-white/40 bg-opacity-70`}>
                        <MdWarning className="h-10 w-10 text-amber-800"/>
                        <p className="text-sm font-semibold text-amber-900">Something went wrong while attempting to validate your credentials.</p>
                        {/* <p className="font-medium text-gray-800 flex flex-col space-y-2 md:space-y-4"><b className="mx-2 text-sm md:text-lg text-center text-gray-500 bg-white block border-2 border-gray-300 rounded" >Try a different account !</b><span><b>ebenezer.ackah@ucc.edu.gh</b> doesn't have <b>access</b> to application services.</span></p> */}
                    </div>

                    {/* Buttons */}
                    <div className={`${showStudentForm || showSSOForm || showVoucherForm ? 'hidden':'flex'} mx-auto md:w-[90%] flex-col space-y-4`}>
                        
                        {/* <GoogleLogin
                            clientId={ REACT_APP_GOOGLE_CLIENT_ID }
                            render={renderProps => (
                              <button onClick={renderProps.onClick} disabled={renderProps.disabled} className={`${showStudentForm || showSSOForm ? 'hidden':'flex'} py-2.5 px-4 md:px-6 w-full flex items-center space-x-4 shadow rounded bg-white font-bold tracking-wider`}>
                                <FcGoogle className="h-6 w-6"/>
                                <span className="text-sm md:text-base">Sign In with MLK Staff Email</span>
                              </button>
                            )}
                            onSuccess={authenticateGoogle}
                            onFailure={errorGoogle}
                            cookiePolicy={'single_host_origin'}
                            hostedDomain={'ucc.edu.gh'}
                        /> */}
                        <button onClick={()=> setShowVoucherForm(true)} className={`${showSSOForm || showStudentForm || showVoucherForm ? 'hidden':'flex'}  py-2.5 px-4 md:px-6 w-full flex items-center space-x-4 shadow rounded bg-white font-bold tracking-wider`}>
                            <PiStudentBold className="h-6 w-6 text-primary-dark"/>
                            <span className="text-sm md:text-base text-primary-dark">Apply with Admission Voucher</span>
                        </button>
                        <button onClick={()=> setShowSSOForm(true)} className={`${showSSOForm || showStudentForm || showVoucherForm ? 'hidden':'flex'} py-2.5 px-4 md:px-6 w-full flex items-center space-x-4 shadow rounded bg-primary-accent/90 font-bold tracking-wider`}>
                            <FcLock className="h-6 w-6"/>
                            <span className="text-sm md:text-base">Sign In with SSO Credentials</span>
                        </button>
                        <button onClick={()=> setShowStudentForm(true)} className={`${showSSOForm || showStudentForm || showVoucherForm ? 'hidden':'flex'} py-2.5 px-4 md:px-6 w-full flex items-center space-x-4 shadow rounded bg-primary-accent/90 font-bold tracking-wider`}>
                            <ImProfile className="h-6 w-6 text-primary-dark"/>
                            <span className="text-sm md:text-base">Sign In with Student Access</span>
                        </button>
                    </div>

                    {/* Forms */}
                    <form onSubmit={authenticateCredential} className={`${showStudentForm || showSSOForm || showVoucherForm ? 'flex':'hidden'} mx-auto py-4 px-3 md:p-4 md:w-[90%] rounded-xl border-[3px] border-primary-dark/30 bg-primary flex-col space-y-4 text-white text-lg`}>
                        <div className="shadow bg-white/10 rounded-md flex items-center justify-between">
                           <h1 className="px-4 py-1 text-lg text-amber-100 font-semibold tracking-widest">
                             {showStudentForm ? 'STUDENT LOGIN' : showVoucherForm ? 'APPLICANT LOGIN':'STAFF LOGIN' }
                           </h1>
                           <div className="relative pr-2">
                              <img src={Adinkra} alt="" className="h-10"/>
                           </div>
                        </div>
                        <div>
                           <input type="text" name={`username`} value={form.username} onChange={onChange} placeholder={`${showStudentForm ? 'Username' : showVoucherForm ? 'Serial':'Username' }`} className="px-4 py-2 w-full text-border-primary/20 font-medium rounded-md border-2 border-primary/20 focus:border-primary/20 bg-primary-dark/30 focus:ring-0 focus:outline-none  placeholder:text-base md:placeholder:text-base placeholder:text-white/50 placeholder:tracking-widest placeholder:uppercase" />
                        </div>
                        <div>
                           <input type="password" name={`password`} value={form.password} onChange={onChange} placeholder={`${showVoucherForm ? 'Pin':'Password'}`} className="px-4 py-2 w-full text-border-blue-50/20 font-medium rounded-md border-2 border-primary/20 focus:border-primary/20 bg-primary-dark/30 focus:ring-0 focus:outline-none  placeholder:text-base md:placeholder:text-base placeholder:text-white/50 placeholder:tracking-widest placeholder:uppercase" />
                        </div>
                        <button type="submit" className="py-2.5 px-4 md:px-10 w-full flex items-center justify-center space-x-4 shadow rounded bg-primary-accent/90 font-bold tracking-wider">
                            <FaLock className="h-4 w-4 text-gray-800"/>
                            <span className="text-sm md:text-base text-gray-800 uppercase">Sign In</span>
                        </button>
                        <button onClick={(e)=> { e.preventDefault(); setShowStudentForm(false); setShowSSOForm(false); setShowVoucherForm(false); }} className="py-1 px-4 mx-auto w-fit rounded-xl bg-primary-dark/70 focus:ring-0 focus:outline-none flex items-center space-x-2">
                          <FaArrowLeft className="w-3 h-3 text-white/60" />
                          <span className="text-sm font-bold text-white/60">Go Back</span>
                        </button>
                    </form>
                </div>
                
            </div>
            <div className="h-14 w-full flex items-center justify-center">
                <p className="text-white text-xs font-medium">Copyright © {new Date().getFullYear()} AUCC.</p>
            </div>
        </section>
      </main>
    </div>
    
  )
}

export default Login