import * as _ from "lodash";
import {ICell, onlyTrue, splitToRowsAndCols} from "./index";

export function valid(stateTask: ICell[]): boolean {
	if (stateTask) {
		const RowsAndCols = splitToRowsAndCols(stateTask);

		if (validListCells(RowsAndCols.rows)) {
			if (validListCells(RowsAndCols.cols)) {
				if (validListCells(RowsAndCols.area)) {
					return true;
				}
			}
		}
	}

	return false;
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
