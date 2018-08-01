import * as express from 'express'
import * as fs from 'fs'
import SimpleJsonMethod from './SimpleJsonMethod'

class SimpleJsonRouter {
    public router;
    constructor() {
        this.router = this.createRouter()
    }
    private createRouter() {
        var router = express.Router()
        var routerSetting = JSON.parse(fs.readFileSync("./routes.json",'utf8'))
        routerSetting.routes.forEach(
            element => {
                if (element.method == 'get') {
                    router.get(element.path,
                        function (req, res, next) {
                            var result = SimpleJsonMethod.routeGet(req, res, element.repository)
                            if (result) {
                                next()
                            }
                        }
                    )
                    return
                }
                if (element.method == 'post') {
                    router.post(element.path,
                        function (req, res, next) {
                            var result = SimpleJsonMethod.routePost(req, res, element.repository)
                            if (result) {
                                next()
                            }
                        }
                    )
                    return
                }
            }
        )
        return router
    }
}
export default new SimpleJsonRouter().router
