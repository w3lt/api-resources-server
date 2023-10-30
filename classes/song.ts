import { Void } from "./void";

class Song implements Void {
    constructor(private id: number) {};

    // Implement from interface Void
    public get(field?: string): any {

    };

    // Implement from interface Void
    public set(field: string, value: any): boolean {
        
    }
}

export { Song };