import { Express } from "express";
import { Void } from "./void";
import { Album } from "./album";
import { Payment } from "./payment";
import { Transaction } from "./transaction";

class User implements Void {
    constructor(private uid: number) {};

    // Implement from interface Void
    public get(field?: string): any {

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

    // The @delete_account method is used to delete this account providing by the uid
    // @params: no
    // @ret: bool
    //      => true if successfull deleted account else false
    public delete_account(): boolean {

    }

    // The @get_album method is used to get albums in the library of this user
    // @params: {
    //      id?: number
    // }
    // @ret: Album[] - an array of album
    //      => 1 album if id is present or all albums if id is absent
    public get_album(id?: number): Album[] {

    }

    // The @get_payment method is used to get payment of this user
    // @params: {
    //      id?: number
    // }
    // @ret: Payment[] - an array of Payment (method)
    //      => 1 payment (method) if id is present or all payments if id is absent
    public get_payment(id?: number): Payment[] {

    }

    // The @get_transaction method is used to get transaction of this user
    // @params: {
    //      id?: number
    // }
    // @ret: Transaction[] - an array of Transaction
    //      => 1 transaction if id is present or all transactions if id is absent
    public get_transaction(id?: number): Transaction[] {
        
    }
}

export { User };