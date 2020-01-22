import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state= {
    localStoreLocation:[],
    activeLocation: {}
}

const mutations= {
    ADD_LOCATION(state,props){
        state.localStoreLocation.push(props)
        // state.localStoreLocation = [...new Set(state.localStoreLocation)];
    },
    SET_ACTIVE_LOCATION(state, props){
        state.activeLocation=props
    }
    
}
const getters={
    getLocalStore(state){
        return state.localStoreLocation
    },
    getActiveLocation(state){
        return state.activeLocation
    }
}

const actions={
    addLocationToStore(store,props){
        store.commit('ADD_LOCATION',props)
    },
    addNewLocationToStore(store,props){
        store.commit('ADD_NEW_LOCATION',props)
    },
    setActiveLocation : (store,props) => {
        store.commit('SET_ACTIVE_LOCATION', props)
    }
}

export default new Vuex.Store({
    state:state,
    mutations:mutations,
    getters:getters,
    actions:actions
})