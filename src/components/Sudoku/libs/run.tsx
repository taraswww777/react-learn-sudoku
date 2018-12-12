import _ from 'lodash';
import {ICell} from "./interfaces";

export function setMainCells(task: ICell[]): ICell[] {
	return _.map(task, (cell: ICell) => {
		return {
			...cell,
			isMain: cell.value > 0
		};
	});
}
