import React, { useEffect, useState } from 'react'
// @ts-ignore
// import Logo from '../assets/img/logo_portalbr_.png'
import Logo from '../assets/img/logo_orange.png'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../utils/authService';
import FloatInput from '../components/FloatInput'
// @ts-ignore
const { REACT_APP_GOOGLE_CLIENT_ID } = import.meta.env;

function Login() {
  const navigate = useNavigate();
  //const { withCredential,withGoogle,isLoading,message,user,isAuthenticated } = useAuth();
  const { withCredential,withGoogle, message, user,isAuthenticated } = useUserStore(state => state);
  const [ form,setForm ] =  useState({ username: '', password: '' })
  const [ loading,setLoading ] =  useState(false)
  

  useEffect(() => {
    setForm({ username: '', password: '' })
  },[])

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

  /*
  
  <form onSubmit={authenticateCredential} className={`${showStudentForm || showSSOForm || showVoucherForm ? 'flex':'hidden'} mx-auto py-4 px-3 md:p-4 md:w-[90%] rounded-xl border-[3px] border-primary-dark/30 bg-primary flex-col space-y-4 text-white text-lg`}>
                       
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
  */

  return (
    <div className="w-full h-full bg-white">
      <main className="h-screen flex flex-col">
          <section className="py-28 flex-1 flex justify-center">
              <div className="p-12 w-[27rem] h-fit border border-[#EAECED]  rounded-xl space-y-10">
                 <div><img className="w-36 mx-auto" src={Logo} /></div>
                 <form  onSubmit={authenticateCredential} className="flex flex-col space-y-4">
                     { message && <div className="px-4 py-1 bg-pink-100/80 rounded text-red-800 text-sm font-medium tracking-wider">Invalid Credentials</div>}
                     <FloatInput label="Username" name="username" value={form.username} onChange={onChange} type="text" />
                     <FloatInput label="Password" type="password" name="password" value={form.password} onChange={onChange} />
                     <button type="submit" className="px-4 py-2.5 bg-primary rounded-full text-base tracking-wider text-white font-semibold">
                       Log In
                     </button>
                 </form>
                 <div></div>

              </div>

          </section>
          <section className="w-full h-12 bg-slate-50 flex items-center justify-center">
            <div className="w-[27rem] flex justify-center items-center">
                <nav className="flex items-center space-x-4">
                  <div className="text-[0.65rem] font-bold text-gray-600">Contact Us</div>
                  <div className="text-[0.65rem] font-bold text-gray-600">Privacy</div>
                  <div className="text-[0.65rem] font-bold text-gray-600">Legal</div>
                </nav>
            </div>
          </section>
      </main>
    </div>
    
  )
}

export default Login