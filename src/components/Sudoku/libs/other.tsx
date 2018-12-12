import * as _ from 'lodash';
import {AREA_NUMBERS, LIST_KEYS_KEY_BOARD, MAX_POS_X, MAX_POS_Y, MIN_POS_X, MIN_POS_Y} from "./constants";
import {ICell, ISplitToRowsAndColl} from "./interfaces";

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

export function getNumberAreaByPos(posX: number, posY: number): number {
	const areaX = getNumberAreaByPosXOrY(posX);
	const areaY = getNumberAreaByPosXOrY(posY);

	return _.get(AREA_NUMBERS, `${areaX}.${areaY}`);
}

export function splitToRowsAndCols(stateTask: ICell[]): ISplitToRowsAndColl {
	let areaNum: number;
	const resultSplit: ISplitToRowsAndColl = {
		area: [],
		cols: [],
		rows: [],
	};

	resultSplit.rows = [];
	resultSplit.cols = [];
	resultSplit.area = [];

	_.map(stateTask, (cell: ICell) => {
		areaNum = getNumberAreaByPos(cell.posX, cell.posY);
		if (!_.isArray(resultSplit.rows[cell.posX])) {
			resultSplit.rows[cell.posX] = [cell];
		} else {
			resultSplit.rows[cell.posX] = _.concat(resultSplit.rows[cell.posX], cell);
		}

		if (!_.isArray(resultSplit.cols[cell.posY])) {
			resultSplit.cols[cell.posY] = [cell];
		} else {
			resultSplit.cols[cell.posY] = _.concat(resultSplit.cols[cell.posY], cell);
		}


		if (!_.isArray(resultSplit.area[areaNum])) {
			resultSplit.area[areaNum] = [cell];
		} else {
			resultSplit.area[areaNum] = _.concat(resultSplit.area[areaNum], cell);
		}
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

export function isKeyNumber(keyVale: string): boolean {
	return -1 !== LIST_KEYS_KEY_BOARD.indexOf(keyVale)
}

export function driveToHorizontal(cell: ICell, stepSize: 1 | -1 = 1): ICell {
	let newPosY = cell.posY + stepSize;
	let newPosX = cell.posX;

	if (newPosY > MAX_POS_Y) {
		newPosY = MIN_POS_Y;
		newPosX += stepSize;
	} else if (newPosY < MIN_POS_Y) {
		newPosY = MAX_POS_Y;
		newPosX += stepSize;
	}

	if (newPosX > MAX_POS_X) {
		newPosX = MIN_POS_X;
	} else if (newPosX < MIN_POS_X) {
		newPosX = MAX_POS_X;
	}

	return genCell(newPosX, newPosY, cell.value);
}

export function driveToVertical(cell: ICell, stepSize: 1 | -1 = 1): ICell {
	let newPosY = cell.posY;
	let newPosX = cell.posX + stepSize;

	if (newPosX > MAX_POS_X) {
		newPosX = MIN_POS_X;
		newPosY += stepSize;
	} else if (newPosX < MIN_POS_X) {
		newPosX = MAX_POS_X;
		newPosY += stepSize;
	}

	if (newPosY > MAX_POS_Y) {
		newPosY = MIN_POS_Y;
	} else if (newPosY < MIN_POS_Y) {
		newPosY = MAX_POS_Y;
	}

	return genCell(newPosX, newPosY, cell.value);
}

export function genDefaultTask(): ICell[] {
	let task: ICell[] = [];

	for (let posX = MIN_POS_X; posX <= MAX_POS_X; posX++) {
		for (let posY = MIN_POS_Y; posY <= MAX_POS_Y; posY++) {
			task.push(genCell(posX, posY));
		}
	}

	return task;
}
