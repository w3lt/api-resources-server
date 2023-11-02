interface Void {
    // The get method is used to get all information about this user (identified by uid)
    // @params: {
    //      field?: string 
    // }
    // @ret: any
    //      => the value of field of this uid or all information about this uid
    get(field?: string): any;

    // The set method is used to set a field with new value for this user (identified by uid)
    // @params: {
    //      field: string, 
    //      value: any
    // }
    // @ret: bool
    //      => true if successfully set value else false
    set(field: string, value: any): boolean;
}

export default Void;