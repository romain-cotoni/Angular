export class MyEntity
{
    private id    : number;
    private label : string;
    private level : string;

    constructor(id: number, label: string, level: string) 
    {
        this.id    = id;
        this.label = label;
        this.level = level;
    }

    public getId()
    {
        return this.id;
    }

    public setId(id: number)
    {
        this.id = id;
    }

    public getLabel()
    {
        return this.label;
    }

    public setLabel(label: string)
    {
        this.label = label;
    }

    public getLevel()
    {
        return this.level;
    }

    public setLevel(level: string)
    {
        this.level = level;
    }
}