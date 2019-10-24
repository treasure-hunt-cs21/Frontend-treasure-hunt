import axios from 'axios';

export const axioswithAuthMine = () => {
    return axios.create({
        headers: {
            Authorization: 'Token ' + process.env.REACT_APP_API_KEY
        },
        baseURL: 'https://lambda-treasure-hunt.herokuapp.com/api/bc'
    })
}

export default axioswithAuthMine;