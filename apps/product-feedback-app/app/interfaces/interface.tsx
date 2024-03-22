export type Status = Planned | InProgress | Live;

export type Planned = { name: 'Planned', color: 'yellow' };
export type InProgress = { name: 'In-Progress', color: 'purple' };
export type Live = { name: 'Live', color: 'blue' };

export interface IComment {
    // [key: string]: string,
    id: string,
    parent: string;
    commentString: string,
    username: string,
    userId: string,
    comments?: IComment[]
}