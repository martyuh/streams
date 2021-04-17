import axios from 'axios'

// instance of axios for the action creators to have access to
export default axios.create({
    baseURL: 'http://localhost:3001',
    
})