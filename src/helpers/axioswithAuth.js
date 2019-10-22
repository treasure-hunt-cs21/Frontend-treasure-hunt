import axios from 'axios';

export const axioswithAuth = () => {
    let auth = 'Token ' + process.env.REACT_APP_API_KEY;
    console.log(process.env.REACT_APP_API_KEY);
    console.log('auth', auth);

    return axios.create({
        headers: {
            Authorization: 'Token ' + process.env.REACT_APP_API_KEY
        },
        baseURL: 'https://lambda-treasure-hunt.herokuapp.com/api/adv'
    })
}

export default axioswithAuth;