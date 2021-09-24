import axios from 'axios'

// export function setHeaderToken(token) {
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
// }

// export function removeHeaderToken() {
//     delete axios.defaults.headers.common['Authorization']
// }


export default axios.create({
    baseURL: `http://localhost:8000/api/v1/`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
