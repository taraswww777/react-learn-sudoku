import _ from 'lodash';
import {MAX_VALUE, MIN_VALUE} from "./constants";
import {ICell, ISplitToRowsColsAreas} from "./interfaces";
import {getNumberAreaByPos, splitToRowsColsAreas} from "./other";

export function setMainCells(task: ICell[]): ICell[] {
	return _.map(task, (cell: ICell) => {
		return {
			...cell,
			isMain: cell.value > 0
		};
	});
}

export function calcHintsToTask(task: ICell[]) {
	let hints: number[] = [];
	const rowsColsAreas: ISplitToRowsColsAreas = splitToRowsColsAreas(task);
	return _.map(task, (cell: ICell) => {
		if (cell.isMain) {
			return cell;
		}
		hints = [];

		for (let estimatedValue = MIN_VALUE; estimatedValue <= MAX_VALUE; estimatedValue++) {
			if (!hasValueInRowsColsAreas(rowsColsAreas, cell, estimatedValue)) {
				hints.push(estimatedValue);
			}
		}

		return {
			...cell,
			hints
		};
	});
}


export function hasValueInRowsColsAreas(rowsColsAreas: ISplitToRowsColsAreas, cell: ICell, value: number): boolean {
	const areaNum = getNumberAreaByPos(cell.posX, cell.posY);

	let resValidRows: boolean = hasValueInArray(rowsColsAreas.rows[cell.posX], value);
	let resValidCols: boolean = hasValueInArray(rowsColsAreas.cols[cell.posY], value);
	let resValidArea: boolean = hasValueInArray(rowsColsAreas.area[areaNum], value);

	return resValidRows || resValidCols || resValidArea;
}

export function hasValueInArray(rowsColsAreas: ICell[], value: number): boolean {
	let i = 0;

	for (i; i < rowsColsAreas.length; i++) {
		if (rowsColsAreas[i].value === value) {
			return true;
		}
	}

	return false;
}

export function hasValueInHints(cell: ICell, value: number): boolean {
	return _.indexOf(cell.hints, value) !== -1;
}

export function calcCell(task: ICell[], targetCell: ICell): ICell {
	console.log('targetCell:', targetCell);
	return targetCell;
}
