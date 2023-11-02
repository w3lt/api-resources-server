import * as jwt from 'jsonwebtoken';

import User, { UserAction } from "../services/user";
import errno from "./error";
import { Token, decodeToken } from "./tokenManagement";

class Actor {
    private actor: User | string;
    private identifier: string
    constructor(actor: User | string) {
        this.actor = actor;
        if (typeof actor === 'string') {
            this.identifier = actor;
        } else {
            this.identifier = actor.get('uid');
        }
    }

    // The @getType method is used to get the type of this actor.
    // There are 2 types: system and user
    // @ret: 'system' or 'user'
    public getType(): 'system' | 'user' {
        if (typeof this.actor === 'string') return 'system';
        else return 'user';
    }

    // The private @verifyToken method is used to check if the token is valid for this user.
    // @params: {
    //      token: string
    // }
    // @ret: boolean | null
    //      => true if successfully verified else false, if cannot verify return null.
    private async verifyToken(token: string): Promise<boolean | null> {
        const isValid = await Token.isValid(token);
        if (isValid === null) {
            return null;
        } else {
            if (isValid) {
                const data = decodeToken(token, this.identifier);
                if (data) return true;
                else return false;
            } else {
                return false;
            }
        }
    }

    // The public @execAction is used to exec an action with a token.
    // @params: {
    //      action: Function | UserAction,
    //      token: string,
    //      args: any[] - arguments of action
    // }
    // @ret: any - the result of action (or void if nothing is returned!)
    public async execAction(action: Function | UserAction, token: string, ...args: any[]) {
        if (this.actor instanceof User) {
            if (typeof action === 'function' || !(action in this.actor)) {
                errno.setCode(45300, action, this.actor);
            } else {
                // check if token is valid for this actor
                // call this.@verifyToken
                const result = await this.verifyToken(token);
                if (result === null) {
                    errno.setCode(45000, token);
                } else {
                    return await (this.actor[action] as Function)(...args);
                }
            }
        } else {
            
        }
    }
}

export default Actor;