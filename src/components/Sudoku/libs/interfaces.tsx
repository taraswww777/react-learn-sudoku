export interface ICell {
	key: string,
	posX: number,
	posY: number,
	value: number | 0,
}

export interface ISplitToRowsAndColl {
	rows: ICell[][],
	cols: ICell[][],
	area: ICell[][],
}
