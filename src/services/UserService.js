import {getData, getError} from "utils/request";
const UserObj = Parse.User;

export default class UserService {
    static async register(username, password) {
        return axios.post("/api/user/register", {username, password}).then(getData).catch(getError);
    }

    static async login(username, password) {
        return Parse.User.logIn(username, password);
    }

    static async logout() {
        return Parse.User.logOut();
    }

    static async updateUserInfo(userId, type, value) {
        return axios.post("/api/user/updateUserInfo", {userId, type, value}).then(getData).catch(getError);
    }

    static async getUser(userId) {
        const query = new Parse.Query(UserObj);
        return query.get(userId);
    }
}