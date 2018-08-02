import * as express from 'express'
import * as fs from 'fs'
import SimpleJsonRouterMethod from './SimpleJsonRouterMethod'

class SimpleJsonRouter {
    public router;

    /**
     * constructor
     */
    constructor() {
        this.router = this.createRouter()
    }

    /**
     * create Router from routes.json
     * @returns {Router}
     */
    private createRouter() {
        var router = express.Router()
        var routerSetting = JSON.parse(fs.readFileSync("./routes.json",'utf8'))
        routerSetting.routes.forEach(
            element => {
                if (element.method == 'get') {
                    router.get(element.path,
                        function (req, res, next) {
                            var result = SimpleJsonRouterMethod.get(req, res, element.repository)
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
                            var result = SimpleJsonRouterMethod.post(req, res, element.repository)
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
