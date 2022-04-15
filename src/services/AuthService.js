import axios from 'axios';


class AuthService {
  static async login({email, password}) {
    return axios.post('http://localhost:3001/users/login', {
                email, password
      })
      .then((res)=>{
        return {
          data: res.data,
          token: res.headers.authorization
        }
      })
  };


};

export default AuthService;