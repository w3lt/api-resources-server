import { Song } from "./song";
import { Void } from "./void";

class Album implements Void {
    constructor(private id: number) {};

    // Implement from interface Void
    public get(field?: string | undefined) {
        
    }

    // Implement from interface Void
    public set(field: string, value: any): boolean {
        
    }

    // The @get_song method is used to get the songs of this album
    // @params: {
    //      id?: number
    // }
    // @ret: Song[] - an array of Song
    //      -> 1 song if the id is present else all songs if id is absent
    public get_song(id?: number): Song[] {

    }
}

export { Album };