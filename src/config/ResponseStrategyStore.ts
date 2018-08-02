import DefaultResponseStrategy from "../strategy/DefaultResponseStrategy";

export const DEFAULT_RESPONSE_STRATEGY: string = 'defaultStrategy'
export const RESPONSE_STRATEGY_STORE: {[key:string]: any} = {
    'defaultStrategy' : DefaultResponseStrategy
}