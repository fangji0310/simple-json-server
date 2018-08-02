import {Request, Response} from "express";

abstract class BaseResponseStrategy {
    /**
     * filter JSON
     * @param {e.Request} request
     * @param {e.Response} response
     * @param {string} repository
     * @param {string} path
     * @returns {any}
     */
    abstract filterJson(request: Request, response: Response, repository: string, path: string): any;

    /**
     * whether check {value} is empty
     * @param value
     * @returns {boolean}
     */
    protected empty(value): boolean {
        if (value == undefined) {
            console.log("undefined")
            return true
        }
        return Object.keys(value).length == 0
    }
}

export default BaseResponseStrategy