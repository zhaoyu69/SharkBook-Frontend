import {getData, getError} from "utils/request";

export default class TypeService {
    static async getUserTypes(userId) {
        if(userId) {
            return axios.post("/api/type/getUserTypes", {userId}).then(getData).catch(getError);
        } else {
            return axios.post("/api/type/getBaseTypes").then(getData).catch(getError);
        }
    }
}