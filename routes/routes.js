const authRoute = require('./authRoute')
const dashboardRoute = require('./dashboardRoutes')
const postsRoute = require('./postsRoute')


const routes = [
    {
        path: '/auth',
        handler: authRoute
    },
    {
        path: '/dashboard',
        handler: dashboardRoute
    },
    {
        path: '/posts',
        handler: postsRoute
    }
]

module.exports = app =>{
    routes.forEach(r =>{
        if(r.path === '/'){
            app.get('/',r.handler)
        }else{
            app.use(r.path, r.handler)
        }
    })
}