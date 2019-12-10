import {getPricelList,getMoCityList} from '@/services/index'
const state = {
    arr:[],
    cityid:[],
    Molist:{}
}
const mutations = {
    setArr(state,payload){
        state.arr=payload
    },
    MosetArr(state,payload){
        state.Molist=payload
    }
 }
 
const actions = {
    async getPricelList({commit}, payload){
        // console.log(...payload)
        let res = await getPricelList(payload);
        console.log(res.data)
        await commit("setArr",res.data)
    },
    //城市北京
    async getMoCityList({commit}){
        // console.log(payload)
        let res = await getMoCityList();
        console.log(res.data,"+++++++++")
        await commit("MosetArr",res.data)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}