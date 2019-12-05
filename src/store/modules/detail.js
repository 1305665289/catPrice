import {getDetailList} from '@/services/index'

const state = {
    detailLists:[],
    detailYear:[], //年份

    allYear: '全部',    // 当前选择年份 与筛选/排序时命名应用
    allYearList:[],
    
}

// 给车款排序
function sortCarList(list){
    // 排序规则 排量升序 && 功率升序 && 自然吸气>涡轮增压
    list.sort((a, b)=>{
        if (a.exhaust_str == b.exhaust_str){
            if (a.max_power_str == b.max_power_str){
                return b.inhale_type > a.inhale_type;
            }else{
                return a.max_power - b.max_power;
            }
        }else{
            return a.exhaust - b.exhaust;
        }
    })
    return list;
}

// 格式化数据
function formatCarList(list){
    // 拼接每款车的key 排量/功率 吸气方式
    list = list.map(item=>{
        item.key = `${item.exhaust_str}/${item.max_power_str} ${item.inhale_type}`;
        return item;
    })
    // let newList = [{
    //     key: '',
    //     list: []
    // }];
    let newList = [];
    
    // 遍历，根据key把数据聚合一下
    list.forEach(item=>{
        let index = newList.findIndex(value=>value.key == item.key);
        if (index !== -1){
            newList[index].list.push(item);
        }else{
            newList.push({
                key: item.key,
                list: [item]
            })
        }
    })
    return newList;
}

const mutations = {
    detailList(state,payload){
        state.detailLists=payload.data;
        console.log(state.detailLists);

        //获取年份
        let year=payload.data.list.map(item=>item.market_attribute.year);
        console.log(year);
        state.detailYear=Array.from(new Set(year));
        state.detailYear=state.detailYear.join(''); //对象转成字符串渲染

        //获取当前选择的年份
        let allYearList=[];
        if(state.allYear=='全部'){
            allYearList=payload.data.list
            console.log(allYearList)
        }else{
            allYearList=payload.data.list.filter(item=>item.market_attribute.year==state.allYearList)
            console.log(allYearList)
        }

        //对当前年份的数据进行排序
        allYearList = sortCarList(allYearList);
        console.log(allYearList)

        // 聚合key相同的车款数据
        allYearList = formatCarList(allYearList);
        state.allYearList = allYearList;
        console.log('allYearList...', allYearList);

    }
}

const actions = {
    async getDetailList({commit}, payload){
        let res = await getDetailList(payload);
        console.log('res...', res);
        commit('detailList', res);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}