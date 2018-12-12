export interface ICell {
	key: string,
	posX: number,
	posY: number,
	value: number | 0,
	isMain?: boolean,
	hasWrong?: boolean,
}

export interface ISplitToRowsAndColl {
	rows: ICell[][],
	cols: ICell[][],
	area: ICell[][],
}
