import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode"
import { StoreState } from "./typings";
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import Cookies from 'universal-cookie';
import Service from '../utils/evsService'
import toast from 'react-hot-toast';

const cookies = new Cookies(null, { path: '/' });
const { REACT_APP_API_URL } = import.meta.env;

export const useUserStore = create<StoreState>()(
  persist(
    (set, get) => ({
        user: null,
        message: null, 
        loading: false,
        isLoggedIn : !!get()?.user,
        isAuthenticated : () => !!get()?.user,
        lasChosen: null,
        search: '',
        courses: [],
        stepUrl: {},
        electionData: null,
        loadUserData: async() => {  
          const storageToken = cookies.get("@Auth:token")
          if (storageToken) {
            const userData = await jwtDecode<JwtPayload>(storageToken)
            set({ user: userData })
          } else {
            set({ user: get().user })
          }
        },

        loadStudentVote: async() => {  
           const user =  get().user;
           const data = await Service.fetchVotes(user?.user?.tag);
           if(data?.length) set({ lasChosen: data && data[0] })
           else set({ lasChosen: null })
        },

        lasChoose: async (data) => {  
          set({ lasChosen: data })
        },

        setSearch: async (data) => {  
          set({ search: data })
        },

        logout: () => {
          cookies.remove("@Auth:token");
          set({ user:null, lasChosen: null })
        }, 

        withCredential : async (username, password) => {
            try {
              set({ message:null, loading: true })
              const res = await axios.post(`${REACT_APP_API_URL}/auth/credential`, {
                username: username,
                password: password,
              });
              const resp = res.data
              if(resp.success){
                // localStorage.setItem("@Auth:token", resp.token);
                cookies.set("@Auth:token", resp.token)
                set({ user:resp.data, loading: false })
              } else {
                set({ message:resp.message, loading: false })
                setTimeout( async() => set({ message:null }), 4000)
              }
              
            } catch (err) {
              set({ message:err.message, loading: false })
              setTimeout( async() => set({ message:null }), 4000)
            }
        },

        
        withGoogle : async (providerId,email) => {
          try {
            set({ message:null, loading: true })
            const res = await axios.post(`${REACT_APP_API_URL}/auth/google`, {
              providerId,
              email,
            });
            
            const resp = res.data
            if(resp.success){
              // localStorage.setItem("@Auth:token", resp.token);
              cookies.set("@Auth:token", resp.token)
              set({ user:resp.data, loading: false })
             
            } else {
              set({ message:resp.message, loading: false })
              setTimeout( async() => set({ message:null }), 4000)
            }
            
          } catch (err) {
            set({ message:err.message, loading: false })
            setTimeout( async() => set({ message:null }), 4000)
          }
        },
        
        changePassword : async (tag, oldpassword, newpassword) => {
          try {
            set({ message:null, loading: true })
            const res = await axios.post(`${REACT_APP_API_URL}/auth/password`, {
               tag,oldpassword,newpassword
            });
            console.log(res.status,res.data.message)
            if(res.status == 200){
              get()?.logout()
              // localStorage.setItem("@Auth:token", resp.token);
              cookies.remove("@Auth:token")
              set({ user:null, courses: [], loading: false })
              toast.success("Password changed!")
            } else if(res.status == 202)
              throw new(res.data.message)
              
          } catch (err) {
            set({ message:err.message, loading: false })
            toast.error(err.message)
          }
      },

      }),
    {
      name: '@Auth', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)




