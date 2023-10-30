import { Void } from "./void";

class Payment implements Void {
    constructor(private id: number) {};

    // Implement from interface Void
    public get(field?: string | undefined) {
        
    }

    // Implement from interface Void
    public set(field: string, value: any): boolean {
        
    }
}

export { Payment };