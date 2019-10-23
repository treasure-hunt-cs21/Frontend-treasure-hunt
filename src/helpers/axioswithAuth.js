import axios from 'axios';

export const axioswithAuth = () => {
    return axios.create({
        headers: {
            Authorization: 'Token ' + process.env.REACT_APP_API_KEY
        },
        baseURL: 'https://lambda-treasure-hunt.herokuapp.com/api/adv'
    })
}

export default axioswithAuth;