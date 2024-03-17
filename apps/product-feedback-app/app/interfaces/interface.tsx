export type Status = Planned | InProgress | Live;

export type Planned = { name: 'Planned', color: 'yellow' };
export type InProgress = { name: 'In-Progress', color: 'purple' };
export type Live = { name: 'Live', color: 'blue' };