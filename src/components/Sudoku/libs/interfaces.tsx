export interface ICell {
	key: string,
	posX: number,
	posY: number,
	value: number | 0,
	isMain?: boolean,
	hasWrong?: boolean,
	hints?: number[]
}

export interface ISplitToRowsColsAreas {
	rows: ICell[][],
	cols: ICell[][],
	area: ICell[][],
}
