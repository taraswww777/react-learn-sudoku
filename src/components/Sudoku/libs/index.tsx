import {AREA_NUMBERS, MAX_POS_X, MAX_POS_Y, MIN_POS_X, MIN_POS_Y} from './constants';
import {ICell, ISplitToRowsAndColl} from './interfaces';
import {
	genCell, genCellKey,
	getNumberAreaByPos,
	getNumberAreaByPosXOrY, onlyTrue, splitToRowsAndCols
} from './other';
import {setMainCells} from './run';
import {IValidResult, valid, validListCells} from './valid';

export {
	// valid
	valid,
	validListCells,
	IValidResult,
	// other
	genCell,
	ISplitToRowsAndColl,
	onlyTrue,
	ICell,
	genCellKey,
	getNumberAreaByPosXOrY,
	getNumberAreaByPos,
	splitToRowsAndCols,
	// constants
	MIN_POS_X,
	MIN_POS_Y,
	MAX_POS_X,
	MAX_POS_Y,
	AREA_NUMBERS,
	setMainCells
}
