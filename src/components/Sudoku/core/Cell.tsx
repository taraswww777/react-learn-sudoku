export const MIN_POS_X = 0;
export const MIN_POS_Y = 0;

export const MAX_POS_X = 9;
export const MAX_POS_Y = 9;

export interface ICell {
	posX: number,
	posY: number,
	value?: number | 0,
}

export function genCell(posX: number, posY: number, value: number = 0): ICell {
	return {
		'posX': posX,
		'posY': posY,
		'value': value,
	}
}
