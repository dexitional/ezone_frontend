import axios from 'axios';
import toast from 'react-hot-toast';
const { REACT_APP_API_URL } = import.meta.env;

class FmsService {
   
//     /* Session */
//     this.router.get('/bills', this.controller.fetchBills);
//     this.router.get('/bills/list', this.controller.fetchBillList);
//     this.router.get('/bills/:id', this.controller.fetchBill);
//     this.router.get('/bills/:id/receipients', this.controller.billReceivers);
//     this.router.post('/bills/:id/include', this.controller.includeBill);
//     this.router.post('/bills/:id/exclude', this.controller.excludeBill);
//     this.router.get('/bills/:id/activate', this.controller.activateBill);
//     this.router.get('/bills/:id/revoke', this.controller.revokeBill);
//     this.router.post('/bills', this.controller.postBill);
//     this.router.patch('/bills/:id', this.controller.updateBill);
//     this.router.delete('/bills/:id', this.controller.deleteBill);


    
    
    /* Accounts & Debtors */

    async fetchAccounts(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/accounts?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            console.error(error.message)
        }
    }

    async fetchDebts(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/accounts/debts?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            console.error(error.message)
        }
    }

    async retireAccount(tag){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/accounts/retire/${encodeURIComponent(tag)}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            console.error(error.message)
        }
    }

   

     /* Charges */

    async fetchCharges(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/charges?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchCharge(chargeId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/charges/${chargeId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postCharge(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/fms/charges`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateCharge(chargeId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/fms/charges/${chargeId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteCharge(chargeId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/fms/charges/${chargeId}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    /* Payments */

    async fetchPayments(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/payments?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            console.error(error.message)
        }
    }

    async fetchPaymentOthers(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/payments/other?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            console.error(error.message)
        }
    }

    async fetchPaymentVouchers(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/payments/voucher?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            console.error(error.message)
        }
    }

    async fetchPayment(paymentId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/payments/${paymentId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            console.error(error.message)
        }
    }

    async postPayment(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/fms/payments`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            console.error(error.message)
        }
    }

    async updatePayment(paymentId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/fms/payments/${paymentId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            console.error(error.message)
        }
    }

    async deletePayment(paymentId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/fms/payments/${paymentId}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            console.error(error.message)
        }
    }


    /* Services */

    async fetchServices(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/services?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchService(serviceId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/services/${serviceId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postService(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/fms/services`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateService(serviceId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/fms/services/${serviceId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteService(serviceId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/fms/services/${serviceId}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    /* Voucher Costs */

    async fetchVsales(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/vsales?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchVsale(id){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/vsales/${id}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postVsale(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/fms/vsales`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateVsale(id,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/fms/vsales/${id}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteVsale(id){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/fms/vsales/${id}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    /* Bills  */

    async fetchBills(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/bills?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchBillList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/bills/list`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async billReceivers(id){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/bills/${id}/receipients`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async includeBill(id,data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/fms/bills/${id}/include`, data,{
                headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async excludeBill(id,data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/fms/bills/${id}/exclude`, data,{
                headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async activateBill(id){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/bills/${id}/activate`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async revokeBill(id){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/bills/${id}/revoke`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async fetchBill(id){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/bills/${id}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postBill(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/fms/bills`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateBill(id,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/fms/bills/${id}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteBill(id){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/fms/bills/${id}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


     /* Helpers */

    //  Fetch Bank Accounts
     async fetchBankaccList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/fms/bankaccs/list`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    
}

export default new FmsService();