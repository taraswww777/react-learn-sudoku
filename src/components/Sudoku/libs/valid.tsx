import * as _ from "lodash";
import {ICell, onlyTrue, splitToRowsAndCols} from "./index";

export function valid(stateTask: ICell[]): boolean {

	let isValidSteps: boolean[] = [];

	if (stateTask) {
		const RowsAndCols = splitToRowsAndCols(stateTask);
		isValidSteps.push(validListCells(RowsAndCols.rows));
		isValidSteps.push(validListCells(RowsAndCols.cols));
		isValidSteps.push(validListCells(RowsAndCols.area));
	}
	return onlyTrue(isValidSteps);
}

export function validListCells(arrRowsTasks: ICell[][]): boolean {
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

	return onlyTrue(isValidSteps);
}
