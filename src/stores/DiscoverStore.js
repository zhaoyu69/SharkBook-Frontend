import { observable, action, computed, toJS } from "mobx";
import FeatureService from "services/FeatureService";

export default class DiscoverStore{
    @observable features = [];

    @action getFeatures=async()=>{
        this.features = await FeatureService.getFeatures();
        console.log(toJS(this.features))
    };
}

export const discoverStore = new DiscoverStore();