import * as fs from 'fs'
import {Request, Response} from "express";
import ResponseStrategyFactory from "./strategy/ResponseStrategyFactory";
import {DEFAULT_RESPONSE_STRATEGY} from "./config/ResponseStrategyStore";

class SimpleJsonRouterMethod {

    /**
     * GET method with default strategy
     * @param {e.Request} request
     * @param {e.Response} response
     * @param {string} repository
     * @returns {boolean}
     */
    static get(request: Request, response: Response, repository: string): boolean

    /**
     * GET method
     *
     * @param {e.Request} request
     * @param {e.Response} response
     * @param {string} repository
     * @param {string} strategyName
     * @returns {boolean}
     */
    static get(request: Request, response: Response, repository: string, strategyName?: string): boolean {
        if (strategyName == undefined) {
            strategyName = DEFAULT_RESPONSE_STRATEGY
        }
        return this.action(request, response, repository, strategyName)
    }

    /**
     * POST method with default strategy
     *
     * @param {e.Request} request
     * @param {e.Response} response
     * @param {string} repository
     * @returns {boolean}
     */
    static post(request: Request, response: Response, repository: string): boolean

    /**
     * POST metehod
     *
     * @param {e.Request} request
     * @param {e.Response} response
     * @param {string} repository
     * @param {string} strategyName
     * @returns {boolean}
     */
    static post(request: Request, response: Response, repository: string, strategyName?: string): boolean {
        if (strategyName == undefined) {
            strategyName = DEFAULT_RESPONSE_STRATEGY
        }
        return this.action(request, response, repository, strategyName)
    }

    /**
     * action method
     * this method consists of two parts.
     * first part: retrieve dummy json object by url
     * second part: filter json object by response strategy
     *
     * @param {e.Request} request
     * @param {e.Response} response
     * @param {string} repository
     * @param {string} strategyName
     * @returns {boolean}
     */
    private static action(request: Request, response: Response, repository: string, strategyName: string): boolean {
        var path = this.retrieveResponsePath(request.url, repository);
        if (path == null) {
            return true
        }

        var responseStrategy = ResponseStrategyFactory.create(strategyName);
        var filterJson = responseStrategy.filterJson(request, response, repository, path);
        response.json(filterJson);
        return false
    }

    /**
     * retrieve dummy json object path
     * it supposed that there is dummy json object in {repository}
     * it recursively finds dummy json object by url.
     * ex.
     *   repostiory = ./example url = /id/user1/user2
     *   it search the dummy json in following order
     *     ./example/id/user1/user2.json
     *     ./example/id/user1.json
     *     ./example/id.json
     *
     * @param {string} url
     * @param {string} repository
     * @returns {string}
     */
    private static retrieveResponsePath(url: string, repository: string):string {
        console.log(url)
        console.log(repository)
        var current = url
        while (current != '') {
            let fullpath = repository + current + ".json"
            if (!fs.existsSync(fullpath)) {
                current = current.substring(0, current.lastIndexOf('/'))
                continue;
            }
            if (fs.statSync(fullpath).isDirectory()) {
                break;
            }
            return current
        }
        return null
    }
}
export default SimpleJsonRouterMethod;
