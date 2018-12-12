import {AREA_NUMBERS, MAX_POS_X, MAX_POS_Y, MIN_POS_X, MIN_POS_Y} from './constants';
import {ICell, ISplitToRowsAndColl} from './interfaces';
import {
	genCell, getNumberAreaByPos,
	getNumberAreaByPosXOrY,
	onlyTrue, splitToRowsAndCols
} from './other';
import {valid, validListCells} from './valid';

export {
	// valid
	valid,
	validListCells,
	// other
	genCell,
	ISplitToRowsAndColl,
	onlyTrue,
	ICell,
	getNumberAreaByPosXOrY,
	getNumberAreaByPos,
	splitToRowsAndCols,
	// constants
	MIN_POS_X,
	MIN_POS_Y,
	MAX_POS_X,
	MAX_POS_Y,
	AREA_NUMBERS,
}
