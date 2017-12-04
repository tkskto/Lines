import {Event, EventDispatcher} from "../events/EventDispatcher";

export class ImageLoader extends EventDispatcher {

    public static IMAGE_LOADED:string = 'imageLoaded';
    public static LOAD_COMPLETE:string = 'loadComplete';

    private _count:number;
    private _loadedCount:number = 0;
    private _src:string[] = [];
    private _img:HTMLImageElement[] = [];

    constructor(_src:string[]) {
        super();
        this._src = _src;
        this._count = _src.length;
    }

    public load() {
        this._loadedCount = 0;

        for (let i = 0; i < this._count; i++) {
            let img:HTMLImageElement = new Image();
            img.onload = this.onFileLoaded;
            img.src = this._src[i];
        }
    }

    private onFileLoaded = (e) => {
        let event = new Event();
        event.type = ImageLoader.IMAGE_LOADED;
        event.currentTarget = this;
        this.dispatchEvent(event);

        this._loadedCount++;
        this._img.push(e.target);

        if (this._count === this._loadedCount) {

            this.onLoadComplete();
        }
    };

    private onLoadComplete = () => {
        this.dispatchEvent(ImageLoader.LOAD_COMPLETE);
    };

    get img(): HTMLImageElement[] {
        return this._img;
    }
}