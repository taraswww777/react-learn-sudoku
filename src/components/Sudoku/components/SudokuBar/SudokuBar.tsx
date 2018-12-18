import * as React from 'react';
import {BEM, IBEMProps} from "../../../../libs/BEM/BEM";
import {STEPS_LIVE_CIRCLE} from "../../libs/constants";
import "./SudokuBar.css";

const COMPONENT_NAME = 'sudoku-bar';

export interface ISudokuBarProps extends IBEMProps {
	fixMainCells: any;
	setHints?: any;
	stepLiveCircle: string;
	calc?: any;
}

function SudokuBar(props: ISudokuBarProps) {
	return (
		<div className={props.block()}>
			{props.stepLiveCircle === STEPS_LIVE_CIRCLE.INITIAL &&
			<button
				className={props.elem('btn', 'run')}
				onClick={props.fixMainCells}
			>fix Main Cells</button>
			}

			{(props.stepLiveCircle === STEPS_LIVE_CIRCLE.CALCULATION || props.stepLiveCircle === STEPS_LIVE_CIRCLE.HINTS) &&
			<button
				className={props.elem('btn', 'run')}
				onClick={props.setHints}
			>set Hints</button>
			}

			{props.stepLiveCircle === STEPS_LIVE_CIRCLE.CALCULATION &&
			<button
				className={props.elem('btn', 'calc')}
				onClick={props.calc}
			>calc</button>
			}

		</div>
	);
}

export default BEM(SudokuBar, COMPONENT_NAME);
