import * as _ from 'lodash';
import {AREA_NUMBERS} from "./constants";

export interface ISplitToRowsAndColl {
	rows: ICell[][],
	cols: ICell[][],
	area: ICell[][],
}

export function onlyTrue(arrBool: boolean[]): boolean {
	return _.findIndex(arrBool, item => !item) === -1;
}


export function getNumberAreaByPosXOrY(pos: number): number {
	if (_.inRange(pos, -1, 3)) {
		return 0;
	} else if (_.inRange(pos, 2, 6)) {
		return 1;
	} else if (_.inRange(pos, 5, 9)) {
		return 2;
	}
	return -1;
}

export interface ICell {
	key: string,
	posX: number,
	posY: number,
	value: number | 0,
}


export function getNumberAreaByPos(posX: number, posY: number): number {
	const areaX = getNumberAreaByPosXOrY(posX);
	const areaY = getNumberAreaByPosXOrY(posY);

	return _.get(AREA_NUMBERS, `${areaX}.${areaY}`);
}


export function splitToRowsAndCols(stateTask: ICell[]): ISplitToRowsAndColl {
	let areaNum: number = 0;
	const resultSplit: ISplitToRowsAndColl = {
		area: [],
		cols: [],
		rows: [],
	};

	resultSplit.rows = resultSplit.cols = resultSplit.area = [];

	// тут тажется можно ещё както оптимизировать избавишись от if
	_.map(stateTask, (cell: ICell) => {
		areaNum = getNumberAreaByPos(cell.posX, cell.posY);
		if (!_.isArray(resultSplit.cols[cell.posY])) {
			resultSplit.cols[cell.posY] = [];
		}
		if (!_.isArray(resultSplit.rows[cell.posX])) {
			resultSplit.rows[cell.posX] = [];
		}
		if (!_.isArray(resultSplit.area[areaNum])) {
			resultSplit.area[areaNum] = [];
		}

		resultSplit.area[areaNum].push(cell);
		resultSplit.cols[cell.posY][cell.posX] = cell;
		resultSplit.rows[cell.posX][cell.posY] = cell;
	});

	return resultSplit;
}

export function genCell(posX: number, posY: number, value: number = 0): ICell {
	return {
		'key': posX + '-' + posY,
		'posX': posX,
		'posY': posY,
		'value': value,
	}
}
