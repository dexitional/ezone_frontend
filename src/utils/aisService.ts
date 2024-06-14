import axios from 'axios';
import toast from 'react-hot-toast';
const { REACT_APP_API_URL } = import.meta.env;

class Service {
    
    /* Calendar */
    async fetchSessionList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/sessions/list`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchSessions(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/sessions?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchSession(sessionId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/sessions/${encodeURIComponent(sessionId)}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async activateSession(sessionId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/sessions/activate`, { sessionId },{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async postSession(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/sessions`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateSession(sessionId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/sessions/${encodeURIComponent(sessionId)}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteSession(sessionId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/sessions/${encodeURIComponent(sessionId)}`)
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }
    
    /* STUDENT */
    async fetchStudents(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/students?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchStudent(studentId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/students/${encodeURIComponent(studentId)}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async fetchStudentFinance(studentId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/students/${encodeURIComponent(studentId)}/finance`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async fetchStudentTranscript(studentId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/students/${encodeURIComponent(studentId)}/transcript`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async fetchStudentActivity(studentId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/students/${encodeURIComponent(studentId)}/activity`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async stageStudentAccess(studentId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/students/stage`,{ studentId })
            console.log(res.status)
            if(res.status == 200 || res.status == 204){
                return res.data
            } else if(res.status == 500){
              toast.error("Portal account already staged")
            }
            else throw new(res.data.message)
        
        } catch (error) {
            console.log(error?.response)
            toast.error(error?.response?.data)
        }
    }

    async resetStudentAccess(studentId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/students/reset`,{ studentId })
            if(res.status == 200 || res.status == 204){
                const data = res?.data
                console.log(data)
                toast(`Password changed to: \t${data?.password}`,{ className:'rounded-full bg-green-100 shadow border-4 border-white text-base text-primary-dark font-semibold', duration: 15000 })
            }
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async changePhoto(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/auth/photos`,data)
            if(res.status == 200 || res.status == 204){
               toast.success("Photo updated!")
               return res.data
            }
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async removePhoto(tag){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/auth/photos/${encodeURIComponent(tag)}`)
            if(res.status == 200 || res.status == 204){
                toast.success("Photo removed!");
                return res.data
            }
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async generateIndex(studentId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/students/indexgen`, { studentId },{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Index number generated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async pardonStudent(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/students/pardon`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Student pardon activated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    async postStudent(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/students`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateStudent(studentId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/students/${encodeURIComponent(studentId)}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteStudent(studentId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/students/${encodeURIComponent(studentId)}`)
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

     /* COURSES */
     async fetchCourseList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/courses/list`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchCourses(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/courses?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchCourse(courseId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/courses/${encodeURIComponent(courseId)}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
     }

     async postCourse(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/courses`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async updateCourse(courseId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/courses/${encodeURIComponent(courseId)}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async deleteCourse(courseId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/courses/${encodeURIComponent(courseId)}`)
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     /* PROGRAMS */
     async fetchProgramList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/programs/list`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            console.error(error.message)
        }
     }

     async fetchPrograms(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/programs?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            console.error(error.message)
        }
    }

    async fetchProgram(programId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/programs/${encodeURIComponent(programId)}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async fetchProgramStructure(programId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/programs/${encodeURIComponent(programId)}/curriculum`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            console.error(error.message)
        }
    }

    async fetchProgramStudent(programId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/programs/${encodeURIComponent(programId)}/students`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async fetchProgramStatistics(programId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/programs/${encodeURIComponent(programId)}/statistics`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postProgram(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/programs`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateProgram(programId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/programs/${encodeURIComponent(programId)}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteProgram(programId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/programs/${encodeURIComponent(programId)}`)
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    /* MAJORS */
    async fetchMajorList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/programs/list`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }


    /* CURRICULUMS */
   
     async fetchCurriculums(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/curriculums?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchCurriculum(curriculumId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/curriculums/${encodeURIComponent(curriculumId)}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
     }

     async postCurriculum(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/curriculums`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async updateCurriculum(curriculumId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/curriculums/${encodeURIComponent(curriculumId)}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async deleteCurriculum(curriculumId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/curriculums/${encodeURIComponent(curriculumId)}`)
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }


    /* Schemes */
    async fetchSchemeList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/schemes/list`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchSchemes(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/schemes?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchScheme(schemeId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/schemes/${encodeURIComponent(schemeId)}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
     }

     async postScheme(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/schemes`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async updateScheme(schemeId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/schemes/${encodeURIComponent(schemeId)}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async deleteScheme(schemeId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/schemes/${encodeURIComponent(schemeId)}`)
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }



    /* Sheets */
    async fetchSheetList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/sheets/list`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchSheets(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/sheets?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchSheet(sheetId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/sheets/${encodeURIComponent(sheetId)}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
     }

     async stageSheet(sessionId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/sheets/stage`, { sessionId },{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Scoresheets created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async loadSheet(sheetId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/sheets/load`, { sheetId },{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async saveSheet(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/sheets/save`, data ,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               //toast.success("Sheet saved!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async postSheet(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/sheets`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async updateSheet(sheetId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/sheets/${encodeURIComponent(sheetId)}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async deleteSheet(sheetId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/sheets/${encodeURIComponent(sheetId)}`)
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }



    /* Registrations */
    async fetchRegistrationList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/registrations/list`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchRegistrations(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/registrations?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchRegistration(registrationId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/registrations/${encodeURIComponent(registrationId)}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
     }

     async fetchRegistrationMount(registrationId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/registrations/mount/${encodeURIComponent(registrationId)}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
     }

     async postRegistration(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/registrations`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            console.log(res.data)
            if(res.status == 200){
               toast.success("Registration completed!")
               return res.data
            } 
            else if(res.status == 202){
                console.log(res)
                toast.success(res.data?.message)
            } 
            else throw(res.data.message)
        
        } catch (error) { 
            toast.success(error.message)
        }
     }

     async updateRegistration(registrationId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/registrations/${encodeURIComponent(registrationId)}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async deleteRegistration(registrationId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/registrations/${encodeURIComponent(registrationId)}`)
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }


     /* DEPARTMENTS */
     async fetchDepartments(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/departments`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     /* FACULTIES */
     async fetchFaculties(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/faculties`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     /* UNITS */

     async fetchUnitList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/units/list`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }
     
     async fetchUnits(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/units?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchUnit(unitId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/units/${encodeURIComponent(unitId)}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
     }

     async postUnit(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/units`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async updateUnit(unitId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/units/${encodeURIComponent(unitId)}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async deleteUnit(unitId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/units/${encodeURIComponent(unitId)}`)
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }


      /* JOBS */

      async fetchJobList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/jobs/list`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }
     
     async fetchJobs(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/jobs?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchJob(jobId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/jobs/${encodeURIComponent(jobId)}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
     }

     async postJob(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/jobs`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async updateJob(jobId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/jobs/${encodeURIComponent(jobId)}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async deleteJob(jobId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/jobs/${encodeURIComponent(jobId)}`)
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }


     /* USER */
     async isUser(staffId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/checkuser`, { userId: staffId })
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async checkUser(userId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/checkuser`, { userId },{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               return res.data
            } 
        } catch (error) { 
            console.error(error.message)
        }
     }

      
     /* USER ROLES */

     async fetchUserRolesById(staffId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/uroles/list`, { staffId })
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }
     
     async fetchUserRoles(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/uroles?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchUserRole(roleId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/uroles/${encodeURIComponent(roleId)}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
     }

     async postUserRole(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/uroles`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("New User Role Created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            console.error(error.message)
        }
     }

     async updateUserRole(roleId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/uroles/${encodeURIComponent(roleId)}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async deleteUserRole(roleId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/uroles/${encodeURIComponent(roleId)}`)
            if(res.status == 200){
               toast.success("User Role Removed!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }


      /* APP ROLES */

      async fetchAppRoleList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/aroles/list`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }


      /* STAFF */
    async fetchStaffs(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/staff?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchStaff(staffId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/staff/${encodeURIComponent(staffId)}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async fetchStaffRole(staffId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/staff/role`,{ staffId })
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }


    async stageStaffAccess(staffId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/staff/stage`,{ staffId })
            console.log(res.status)
            if(res.status == 200 || res.status == 204){
                return res.data
            } else if(res.status == 500){
              toast.error("User account already staged")
            }
            else throw new(res.data.message)
        
        } catch (error) {
            console.log(error?.response)
            toast.error(error?.response?.data)
        }
    }

    async resetStaffAccess(staffId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/staff/reset`,{ staffId })
            if(res.status == 200 || res.status == 204){
                const data = res?.data
                console.log(data)
                toast(`Password changed to: \t${data?.password}`,{ className:'rounded-full bg-green-100 shadow border-4 border-white text-base text-primary-dark font-semibold', duration: 15000 })
            }
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postStaff(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/staff`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateStaff(staffId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/staff/${encodeURIComponent(staffId)}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteStaff(staffId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/staff/${encodeURIComponent(staffId)}`)
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        } catch (error) { 
            toast.error(error.message)
        }
    }

    



     /* HELPERS */
     async fetchCountries(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/countries`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchRegions(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/regions`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchReligions(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/religions`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchDisabilities(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/disabilities`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchTitles(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/titles`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchCategories(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/categories`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchMarital(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/marital`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchRelations(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/relations`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchCollectors(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/collectors`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }


     async fetchVendors(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/vendors`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchAppRoles(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/approles`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async convertBase64(file){
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => resolve(fileReader.result)
          fileReader.onerror = error => reject(error)
        })
     }

     async base64ToUrl(base64){
       return base64;
     }

    
}

export default new Service();