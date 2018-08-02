import BaseResponseStrategy from "./BaseResponseStrategy";
import {RESPONSE_STRATEGY_STORE} from "../config/ResponseStrategyStore";

class ResponseStrategyFactory {
    /**
     * create ResponseStrategy instance by strategyName
     *
     * @param {string} strategyName
     * @returns {BaseResponseStrategy}
     */
    static create(strategyName: string): BaseResponseStrategy {
        var allStrategies = RESPONSE_STRATEGY_STORE
        if (allStrategies[strategyName] == undefined || allStrategies[strategyName] == null) {
            throw new Error(`Class type of ${strategyName} is not defined`)
        }
        return new allStrategies[strategyName]();
    }
}
export default ResponseStrategyFactory