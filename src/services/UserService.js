import {getData, getError} from "utils/request";

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
}