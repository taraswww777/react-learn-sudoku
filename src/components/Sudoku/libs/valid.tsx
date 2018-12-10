import * as _ from "lodash";
import {ICell, onlyTrue, splitToRowsAndCols} from "./index";

export function valid(stateTask: ICell[]): boolean {
	let isValidSteps: boolean[] = [];

	if (stateTask) {
		const RowsAndCols = splitToRowsAndCols(stateTask);

		// все числа в строках уникальны
		isValidSteps.push(validListCells(RowsAndCols.rows));
		// все числа в колонках уникальны
		isValidSteps.push(validListCells(RowsAndCols.cols));
		// все числа в больших квадратах уникальны
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
			const allUniqValuesCount = _.uniq(values).length;
			isValidSteps.push(allValuesCount === allUniqValuesCount);
		});
	}

	return onlyTrue(isValidSteps);
}
