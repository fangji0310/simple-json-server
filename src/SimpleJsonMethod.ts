import * as fs from 'fs'
import {Request, Response} from "express";

class SimpleJsonMethod {
    static routeGet(request: Request, response: Response, repository: string): boolean {
        var json = this.retrieveResponse(request.url, repository);
        if (json != null) {
            response.json(json);
        }
        return true
    }
    static routePost(request: Request, response: Response, repository: string): boolean {
        var url = request.url
        return true
    }

    private static retrieveResponse(url: string, repository: string):JSON {
        console.log(url)
        console.log(repository)
        var current = repository + url
        while (current != repository) {
            if (!fs.existsSync(current + ".json")) {
                console.log("not exists:" + current + ".json");
                current = current.substring(0, current.lastIndexOf('/'));
                continue;
            }
            if (fs.statSync(current + ".json").isDirectory()) {
                console.log("directory exists:" + current + ".json");
                break;
            }
            return JSON.parse(fs.readFileSync(current + ".json", 'utf8'))
        }
        return null
    }
}
export default SimpleJsonMethod;
