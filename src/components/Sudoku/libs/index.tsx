import {
	calcCell,
	calcHintsToTask, hasValueInArray,
	hasValueInHints, hasValueInRowsColsAreas,
	setMainCells
} from './calc';
import {
	AREA_NUMBERS,
	MAX_POS_X, MAX_POS_Y, MAX_VALUE,
	MIN_POS_X, MIN_POS_Y, MIN_VALUE
} from './constants';
import {ICell, ISplitToRowsColsAreas} from './interfaces';
import {
	driveToHorizontal, driveToVertical, genCell,
	genCellKey, genDefaultTask, getNumberAreaByPos,
	getNumberAreaByPosXOrY, onlyTrue,
	splitToRowsColsAreas, updateCellInArray
} from './other';
import {IValidResult, valid, validListCells} from './valid';

export {
	// valid
	valid,
	validListCells,
	IValidResult,
	// other
	genCell,
	ISplitToRowsColsAreas,
	onlyTrue,updateCellInArray,
	driveToHorizontal,
	driveToVertical,
	genDefaultTask,
	ICell,
	genCellKey,
	getNumberAreaByPosXOrY,
	getNumberAreaByPos,
	splitToRowsColsAreas,
	// constants
	MIN_POS_X,
	MIN_POS_Y,
	MAX_POS_X,
	MAX_POS_Y,
	AREA_NUMBERS,
	MIN_VALUE,
	MAX_VALUE,
	// run
	calcCell,
	calcHintsToTask,
	setMainCells,
	hasValueInRowsColsAreas,
	hasValueInHints,
	hasValueInArray,
}
