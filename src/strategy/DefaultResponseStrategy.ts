import BaseResponseStrategy from "./BaseResponseStrategy";
import {Request, Response} from "express";
import * as fs from 'fs'

class DefaultResponseStrategy extends BaseResponseStrategy {

    /**
     * filter JSON
     * @param {e.Request} request
     * @param {e.Response} response
     * @param {string} repository
     * @param {string} path
     * @returns {any}
     */
    filterJson(request: Request, response: Response, repository: string, path: string): any {
        var json = JSON.parse(fs.readFileSync(repository + path + ".json", 'utf8'))
        var remainParams = this.getRemainParams(request.route.path, path, request.params);
        var filterJson = this.filterByParams(remainParams, request.params, json)
        return this.filterByQuery(request.query, filterJson)
    }

    getRemainParams(routePath: string, filePath: string, params: any):string[] {
        let routeSet = routePath.split('/')
        let pathSet = filePath.split('/')
        let remainSet = routeSet.slice(pathSet.length)
        let remainParameters = []
        for(let k of remainSet) {
            if (k.startsWith(':')) {
                remainParameters.push(k.substring(1))
            }
        }
        return remainParameters
    }

    filterByParams(keys: string[], params: any, json: any): any {
        if (json == undefined || json == null) {
            return {}
        }
        if (this.empty(keys)) {
            return json
        }
        var key = keys[0]
        var value = params[keys[0]]
        keys = keys.length == 1 ? [] : keys.slice(1);
        if (json[value] == undefined || json[value] == null) {
            return {}
        }
        return this.filterByParams(keys, params, json[value])
    }

    filterByQuery(query: any, json: any): any {
        if (this.empty(query)) {
            return json
        }
        for(let k in json) {
            let row = json[k]
            let found = true;
            for(let property in query) {
                if (row[property] != query[property]) {
                    found = false
                    break
                }
            }
            if (found) {
                return row
            }
        }
        return {}
    }
}
export default DefaultResponseStrategy