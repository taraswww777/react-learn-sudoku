import * as _ from "lodash";
import * as React from 'react';
import {BEM, IBEMProps} from "../../../libs/BEM/BEM";
import "../css/SudokuKeyboard.css";

// TODO need setValue
interface ISudokuKeyboardProps extends IBEMProps {
	cellKey: string,
	setValue: any
}

const keys: number[] = [
	1, 2, 3, 4, 5, 6, 7, 8, 9
];
const componentName = 'sudoku-keyboard';

function onClick(keyValue: number, cellKey: string,setValue:any) {
	return () => {
		setValue(cellKey,keyValue);
	}
}

function SudokuKeyboard(props: ISudokuKeyboardProps) {
	return (
		<div className={props.block()}>
			<div className={props.elem('grid')}>
				<span className={props.elem('close')}>x</span>
				{_.map(keys, (key: number) =>
					<div onClick={onClick(key, props.cellKey,props.setValue)} className={props.elem('key')}>{key}</div>
				)}
			</div>
		</div>
	);

}

export default BEM(SudokuKeyboard, componentName);
