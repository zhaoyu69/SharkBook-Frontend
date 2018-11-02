import {getData, getError} from "utils/request";

export default class FeatureService {
    static getFeatures() {
        return axios.get('/api/feature/getFeatures').then(getData).catch(getError);
    }
}