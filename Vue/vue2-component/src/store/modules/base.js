// import { getThemeName } from '@/utils/auth'
const state = {
    // themeName: getThemeName()
    themeName: null
  }
  
  const mutations = {
    SET_THEME_NAME: (state, val) => {
      state.themeName = val
    }
  
  }
  
  const actions = {
    setThemeName({ commit }, val) {
      commit('SET_THEME_NAME', val)
    }
  
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  