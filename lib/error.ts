import util from 'util';
import User from '../services/user';

const errors: {[key: number]: string | Function} = {
    45000: "Invalid owner's id",
    45001: "Invalid permissions",
    45002: "Invalid expiration time",
    45100: "Environment variables are not available",
    45200: 'SQL Client is null',
    45300: (action: string, actor: User | string) => {return util.format("\x1b[32m%s \x1b[91mis not an action of \x1b[32m%s", action, actor);},
    45400: "Invalid token or secret key",
    45500: (token: string) => {return util.format("\x1b[91mcannot verify token \x1b[32m%s", token)}
}

class MyError {
    private code: keyof typeof errors = 0;
    private message: string = '';
    constructor() {};

    public setCode(code: number, ...args: any[]) {
        this.code = code;
        if (typeof errors[code] === 'string') this.message = errors[code] as string;
        else {
            this.message = (errors[code] as Function)(...args);
        }
    }

    public getCode() {
        return this.code;
    }

    public setCustomMessage(message: string) {
        this.code = 99999;
        this.message = message;
    }

    public getMessage() {
        return this.message;
    }

    [util.inspect.custom](depth: number, opts: util.InspectOptions) {
        return `\x1b[91m${this.code}: ${this.message}`;
    }
}

const errno = new MyError();
export default errno;