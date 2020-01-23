import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state= {
    localStoreLocation:[],
    activeLocation: {},
    activePage:null
}

const mutations= {
    ADD_LOCATION(state,props){
        state.localStoreLocation.push(props)
        // state.localStoreLocation = [...new Set(state.localStoreLocation)];
    },
    SET_ACTIVE_LOCATION(state, props){
        state.activeLocation=props
    },
    SET_ACTIVE_PAGE(state, props){
        state.activePage=props

    }
    
}
const getters={
    getLocalStore(state){
        return state.localStoreLocation
    },
    getActiveLocation(state){
        return state.activeLocation
    },
    getActivePage(state){
        return state.activePage
    }
}

const actions={
    addLocationToStore(store,props){
        store.commit('ADD_LOCATION',props)
    },
    setActiveLocation : (store,props) => {
        store.commit('SET_ACTIVE_LOCATION', props)
    },
    setActivePage : (store,props) => {
        store.commit('SET_ACTIVE_PAGE', props)
    }
}

export default new Vuex.Store({
    state:state,
    mutations:mutations,
    getters:getters,
    actions:actions
})