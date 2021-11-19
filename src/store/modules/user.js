import {
    login,
    logout
} from '@/api/user'
import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'
import {
    resetRouter
} from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        nickName: '',
        headPortrait: ''
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())

    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_nickName: (state, nickName) => {
        state.nickName = nickName
    },
    SET_headPortrait: (state, headPortrait) => {
        state.headPortrait = headPortrait
    }

}

const actions = {
    // user login
    login({
        commit
    }, userInfo) {
        const {
            phoneNumber,
            code
        } = userInfo
        return new Promise((resolve, reject) => {

            login({
                phoneNumber: phoneNumber.trim(),
                code: code,

            }).then(response => {
                if (!response) {
                    return reject('Verification failed, please Login again.')
                }
                const {
                    token,
                    nickName,
                    headPortrait
                } = response.data
                commit('SET_TOKEN', token)
                setToken(token)
                commit('SET_nickName', nickName)
                commit('SET_headPortrait', headPortrait)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({
        commit
    }) {
        return new Promise(resolve => {

            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}