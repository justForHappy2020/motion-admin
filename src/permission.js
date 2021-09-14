import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login'] // no redirect whitelist


router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken) {

        console.log(hasToken)
            //会打印出四个undefined
            // if (to.path === '/login') {
            //     // if is logged in, redirect to the home page
            //     console.log('lll')
            //     next({ path: '/' })
            //     NProgress.done()
            // } else {
            //     console.log('KKK')
            //     next()
            //     NProgress.done()
            // }


        if (to.path === '/login') {
            console.log('司六')
            console.log(to.path)
                // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done()
        } else {
            console.log('司六else')
            console.log(from.path)
            console.log(to.path)
            const hasGetUserInfo = store.getters.nickName
            console.log(hasGetUserInfo)
            if (hasGetUserInfo) {
                next()
                console.log(to.path)
                NProgress.done()
            } else {
                try {
                    // get user info 
                    console.log('1')
                        // await store.dispatch('user/login')
                    next()
                } catch (error) {
                    console.log('2')
                        // console.info('I have not name')
                        // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    console.log(error)
                        // Message.error(error || 'Has Error')
                    console.log(hasToken)
                    console.log(to.path)

                    next(`/login?redirect=${to.path}`)
                    NProgress.done()

                }
            }
        }
    } else {
        /* has no token*/
        console.info('米希')
        console.info(to.path)
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }


})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})