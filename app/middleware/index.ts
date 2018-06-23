import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';

export const enum LogVerbosityLevel {
    DEBUG = "DEBUG",
    INFO = "INFO"
  };

export const LoggingMiddleware: Middleware = (api: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: any) => {
    if (typeof action === "function") {
        console.debug('dispatching thunk');
    } else if (action.meta && action.meta.logVerbosity === LogVerbosityLevel.DEBUG) {
        console.debug('dispatching', action.type, action)
    } else {
        console.log('dispatching', action.type, action);
    }

    let result = next(action);    
    
    console.debug('next state', api.getState());
    return result;
};