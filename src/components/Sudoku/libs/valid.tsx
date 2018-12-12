import * as _ from "lodash";
import {ICell, ISplitToRowsColsAreas, onlyTrue, splitToRowsColsAreas} from "./index";

export interface IValidResult {
	isValid: boolean;
	ceilHasWrong?: ICell[];
}

export function valid(stateTask: ICell[]): IValidResult {
	let validResult: IValidResult = {isValid: false};
	if (stateTask) {
		const RowsAndCols: ISplitToRowsColsAreas = splitToRowsColsAreas(stateTask);

		let resValidRows: boolean[] = validListCells(RowsAndCols.rows);
		let resValidCols: boolean[] = validListCells(RowsAndCols.cols);
		let resValidArea: boolean[] = validListCells(RowsAndCols.area);

		validResult.isValid = onlyTrue(resValidRows) && onlyTrue(resValidCols) && onlyTrue(resValidArea);
	}

	return validResult;
}

export function validListCells(arrRowsTasks: ICell[][]): boolean[] {
	let isValidSteps: boolean[] = [];

	if (arrRowsTasks) {
		_.map(arrRowsTasks, (row: ICell[]) => {
			const values: number[] = _.compact(_.map(row, 'value'));
			const allValuesCount = values.length;
			const allUniqValues = _.uniq(values);
			const allUniqValuesCount = allUniqValues.length;

			isValidSteps.push(allValuesCount === allUniqValuesCount);
		});
	}

	return isValidSteps;
}
