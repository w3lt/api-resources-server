import * as jwt from 'jsonwebtoken';

import errno from "./error";
import { Query, SelectResult } from './sqlClient';

// Each token requestor has to specify the permission of token.
// Permission is reprensted of 2 fields: read and write.
interface Permissions {
    readPermissions: {
        'user': number,
        'music': 'only-free' | 'premium',
        'album': boolean,
        'payment': boolean,
        'transaction': boolean
    },
    writePermissions: {
        'user': number,
        'music': 'only-me' | null,
        'album': boolean,
        'payment': boolean
    }
}

// The function @verifyPermissions is used to verify if the permissions is valid or not.
// It will verify the range of 'user' field of read and write permissions.
// The 'user' field is an integer from 0 to 255 (inclusive)
// @params: {
//      permissions: Permissions
// }
// @ret: bool
//      => true if successfully verified else false
function verifyPermissions(permissions: Permissions): boolean {
    const read_permissions_verify = Number.isInteger(permissions.readPermissions['user']) && 0 <= permissions.readPermissions['user'] && permissions.readPermissions['user'] <= 255;
    if (!read_permissions_verify) return false;
    else return Number.isInteger(permissions.writePermissions['user']) && 0 <= permissions.writePermissions['user'] && permissions.writePermissions['user'] <= 255;
}

class Token {
    constructor(private ownerId: number | string, private permissions: Permissions, 
                private createdAt: Date, private expirationTime: Date) {};

    // The @extractToken method is used to extract a usable token
    // @ret: string - the token
    public extractToken(): string {
        return jwt.sign({
            permissions: this.permissions,
            createdAt: this.createdAt,
            expirationTime: this.expirationTime
        }, `${this.ownerId}`, {algorithm: 'HS256'});
    }

    // The static @isValid method is used to check if a token is valid or not (is expired or not)
    // @params: {
    //      token: string
    // }
    // @ret: boolean | null
    //      => true if valid or false if not, if cannot check @ret = null
    public static async isValid(token: string): Promise<boolean | null> {
        const query = new Query(`SELECT token FROM tokens WHERE token=${token}`);
        var result = null;
        try {
            result = await query.exec() as (SelectResult | null);
        } catch (error) {
            errno.setCustomMessage(error as string);
            return null;
        }
        
        if (result !== null) {
            if (result.countData() == 0) return false;
            else return true;
        } else {
            return null;
        }
    }
}

// @generateNewToken function is used to generate a new token by providing the owner id and permission
// @params: {
//      ownerId: number or string, (uid or a system)
//      permission: string,
//      expirationTime: Date
// }
// @ret: Token - new token
function generateNewToken(ownerId: number | string, permissions: Permissions, expirationTime: Date): Token | null {
    // Invalid owner id
    if (typeof ownerId === 'number' && ownerId < 0) { // user
        errno.setCode(45000);
        return null;
    } else { // system
        // check if owner id of system is valid or not
    }

    if (!verifyPermissions(permissions)) { // Invalid permissions
        errno.setCode(45001); 
        return null;
    }

    if (new Date() >= expirationTime) { //Invalid expriation time
        errno.setCode(45002); 
        return null;
    }

    return new Token(ownerId, permissions, new Date(), expirationTime);
}

// The @decodeToken function is used to decode a string token and create a Token.
// @params: {
//      token: string,
//      secretKey: number or string - owner's of this token
// }
// @ret: Token or null
//      => Token if successfully decoded or null if it got error
function decodeToken(token: string, secretKey: number | string): Token | null {
    var ret: Token | null = null;
    jwt.verify(token, `${secretKey}`, (error, result) => {
        result = result as {permissions: Permissions, createdAt: string, expirationTime: string};
        if (error) {
            errno.setCode(45400);
            ret = null;
        } else {
            if (!verifyPermissions(result.permissions)) { // Invalid permissions
                errno.setCode(45001); 
                ret = null;
            } else {
                ret = new Token(secretKey, result.permissions, result.createdAt, result.expirationTime);
            }
        }
    })
    
    return ret;
}

export { generateNewToken, Permissions, Token, decodeToken };