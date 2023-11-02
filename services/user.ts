import util from 'util';

import Void from "./void";
import Album from "./album";
import Payment from "./payment";
import Transaction from "./transaction";
import { Permissions, Token } from "../lib/tokenManagement";
import { Query, SelectResult } from "../lib/sqlClient";
import errno from "../lib/error";

class User implements Void {
    constructor(private uid: number) {};

    // Implement from interface Void
    public get(field?: string): any {
        if (field === 'uid') {
            return this.uid;
        }
    };

    // Implement from interface Void
    public set(field: string, value: any): boolean {

    }

    // The @authenticate method is used to authenticate an user providing his/her username and password
    // @params: {
    //      username: string,
    //      password: string
    // }
    // @ret: bool
    //      => true if successfully authenticated else false
    public static authenticate(username: string, passsword: string): boolean {

    }

    // The @register method is used to register new user providing his/her email, username and password
    // @params: {
    //      email: string,
    //      username: string,
    //      password: string
    // }
    // @ret: number
    //      => an uid if successfully register esle -1
    public static register(email: string, username: string, password: string): number {

    }

    // The @deleteAccount method is used to delete this account providing by the uid
    // @params: no
    // @ret: bool
    //      => true if successfull deleted account else false
    public deleteAccount(): boolean {

    }

    // The @getAlbum method is used to get albums in the library of this user
    // @params: {
    //      id?: number
    // }
    // @ret: Album[] - an array of album
    //      => 1 album if id is present or all albums if id is absent
    public getAlbum(id?: number): Album[] {

    }

    // The @getPayment method is used to get payment of this user
    // @params: {
    //      id?: number
    // }
    // @ret: Payment[] - an array of Payment (method)
    //      => 1 payment (method) if id is present or all payments if id is absent
    public getPayment(id?: number): Payment[] {

    }

    // The @getTransaction method is used to get transaction of this user
    // @params: {
    //      id?: number
    // }
    // @ret: Transaction[] - an array of Transaction
    //      => 1 transaction if id is present or all transactions if id is absent
    public getTransaction(id?: number): Transaction[] {
        
    }

    // The @hasPermissions method is used to verify if this user has the specific permissions.
    // @params: {
    //      permissions: Permissions
    // }
    // @ret: bool
    //      => true if successfully verified else false
    public hasPermissions(permissions: Permissions): boolean {

    }

    // The @isValid static method is used to check if a uid is valid or not.
    // @params: {
    //      uid: number
    // }
    // @ret: bool | null
    //      => true if the uid is valid else false
    //      => if error => return null
    public static async isValid(uid: number): Promise<boolean | null> {
        try {
            const result = await new Query(`SELECT uid FROM users WHERE uid=${uid}`).exec() as (SelectResult | null);
            if (result === null) {
                return null;
            } else {
                if (result.countData() > 0) return true;
                else return false;
            }
        } catch (error) {
            errno.setCustomMessage(error as string);
            return null;
        }
    }

    [util.inspect.custom](depth: number, opts: util.InspectOptions) {
        return `user ${this.uid}`;
    }
}

type UserAction = keyof User;

export default User;
export { UserAction };