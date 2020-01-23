import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state= {
    localStoreLocation:[],
    localStoreWalk:[],
    activeLocation: {},
    activePage:null,
    activeWalk:{}
}

const mutations= {
    ADD_LOCATION(state,props){
        state.localStoreLocation.push(props)
    },
    ADD_WALK(state,props){
        state.localStoreWalk.push(props)
    },
    SET_ACTIVE_LOCATION(state, props){
        state.activeLocation=props
    },
    SET_ACTIVE_PAGE(state, props){
        state.activePage=props
    },
    SET_ACTIVE_WALK(state, props){
        state.activeWalk=props
    },
    DELETE_LOCATION(state,props){
        state.localStoreLocation=state.localStoreLocation.filter((item) => item.name !== props.name)
    },
    DELETE_WALK(state,props){
        state.localStoreWalk=state.localStoreWalk.filter((item) => item.name !== props.name)
    }
}
const getters={
    getLocalStoreLocation(state){
        return state.localStoreLocation
    },
    getLocalStoreWalk(state){
        return state.localStoreWalk
    },
    getLocalStoreWalk(state){
        return state.localStoreWalk
    },
    getActiveLocation(state){
        return state.activeLocation
    },
    getActivePage(state){
        return state.activePage
    },
    getActiveWalk(state){
        return state.activeWalk
    },
}

const actions={
    addLocationToStore(store,props){
        store.commit('ADD_LOCATION',props)
    },
    addWalkToStore(store,props){
        store.commit('ADD_WALK',props)
    },
    setActiveLocation : (store,props) => {
        store.commit('SET_ACTIVE_LOCATION', props)
    },
    setActivePage : (store,props) => {
        store.commit('SET_ACTIVE_PAGE', props)
    },
    setActiveWalk : (store,props) => {
        store.commit('SET_ACTIVE_WALK', props)
    },
    deleteLocationFromStore: (store, props) => {
        store.commit('DELETE_LOCATION', props)
    },
    deleteWalkFromStore: (store, props) => {
        store.commit('DELETE_WALK', props)
    }
}

export default new Vuex.Store({
    state:state,
    mutations:mutations,
    getters:getters,
    actions:actions
})