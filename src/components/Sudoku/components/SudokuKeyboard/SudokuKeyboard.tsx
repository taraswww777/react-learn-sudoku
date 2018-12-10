import * as _ from "lodash";
import * as React from 'react';
import {BEM, IBEMProps} from "../../../../libs/BEM/BEM";
import {ICell} from "../../libs";
import {fnCloseKeyboard, fnSetCellValue} from "../Sudoku/Sudoku";
import "./SudokuKeyboard.css";

const keys: number[] = [
	1, 2, 3, 4, 5, 6, 7, 8, 9
];
const componentName = 'sudoku-keyboard';

function onClickClose(closeKeyboard: fnCloseKeyboard) {
	return () => {
		closeKeyboard()
	};
}

function onClickSetValue(newValue: number, cell: ICell, setCellValue: fnSetCellValue) {
	return () => {
		setCellValue({
			...cell,
			value: newValue
		});
	}
}

interface ISudokuKeyboardProps extends IBEMProps {
	cell: ICell;
	keyboardWrongValue?: number | null
	closeKeyboard: fnCloseKeyboard;
	setCellValue: fnSetCellValue;
}

function SudokuKeyboard(props: ISudokuKeyboardProps) {
	return (
		<div className={props.block()}>
			<div className={props.elem('keys')}>
					<span
						className={props.elem('close')}
						onClick={onClickClose(props.closeKeyboard)}>x</span>
				<div className={props.elem('grid')}>
					{_.map(keys, (key: number) =>
						<div
							key={key}
							onClick={onClickSetValue(key, props.cell, props.setCellValue)}
							className={props.joinClasses(
								props.elem('key'),
								props.elem('key', props.cell.value === key ? 'current' : ''),
								props.elem('key', props.keyboardWrongValue === key ? 'wrong' : '')
							)}
						>{key}</div>
					)}
				</div>

				<div
					onClick={onClickSetValue(0, props.cell, props.setCellValue)}
					className={props.joinClasses(
						props.elem('key'),
						props.elem('key', props.cell.value === 0 ? 'current' : '')
					)}>clear
				</div>
			</div>
		</div>
	);
}

export default BEM(SudokuKeyboard, componentName);
