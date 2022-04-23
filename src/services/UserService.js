import axios from 'axios';


class UserService {
  static async getBookedUsers(ids) {
    console.log(ids)
    return axios.post('http://localhost:3001/users/getUsersByIds', {ids})
      .then((res)=>{
        return res.data
      })
  };

};

export default UserService;