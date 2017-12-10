export class Text extends createjs.Container {
    constructor(private _width: number, private _height: number) {
        super();
        this.init();
    }

    private init = () => {
        const text: createjs.Text = new createjs.Text('WORKS', '240px "roboto"', '#ffffff');
        text.textAlign = 'center';
        text.textBaseline = 'middle';
        text.x = this._width * .5;
        text.y = this._height * .5;
        this.addChild(text);
    }
}