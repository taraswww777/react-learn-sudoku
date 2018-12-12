import * as _ from "lodash";
import * as React from 'react';
import {BEM, IBEMProps} from "../../../../libs/BEM/BEM";
import {hasValueInHints, ICell} from "../../libs";
import {isKeyNumber} from "../../libs/other";
import {fnCloseKeyboard, fnSetCellValue} from "../Sudoku/Sudoku";
import "./SudokuKeyboard.css";

const keys: number[] = [
	1, 2, 3, 4, 5, 6, 7, 8, 9
];
const componentName = 'sudoku-keyboard';

interface ISudokuKeyboardProps extends IBEMProps {
	cell: ICell;
	keyboardWrongValue?: number | null
	closeKeyboard: fnCloseKeyboard;
	setCellValue: fnSetCellValue;
}


class SudokuKeyboard extends React.Component <ISudokuKeyboardProps> {

	constructor(props: any) {
		super(props);

		this.onKeyPressSetValue = this.onKeyPressSetValue.bind(this);
		this.onClickSetValue = this.onClickSetValue.bind(this);
		this.onClickClose = this.onClickClose.bind(this);
	}

	public onKeyPressSetValue(event: any): void {
		if (isKeyNumber(event.key)) {
			let keyValue = _.parseInt(event.key);

			this.onClickSetValue(keyValue)();
		} else if (event.key === 'Escape') {
			this.props.closeKeyboard();
		}
	}

	public onClickSetValue(newValue: number) {
		return () => {
			this.props.setCellValue({
				...this.props.cell,
				value: newValue
			});
		}
	}

	public onClickClose() {
		return () => {
			this.props.closeKeyboard()
		};
	}

	public render() {
		return (
			<div className={this.props.block()}>
				<div className={this.props.elem('keys')}>
					<span
						className={this.props.elem('close')}
						onClick={this.onClickClose()}>x</span>
					<div className={this.props.elem('grid')}>
						{_.map(keys, (key: number) => {
							let isOff = false;

							if (this.props.cell.hints) {
								isOff = !hasValueInHints(this.props.cell, key);
							}

							return (<div
								key={key}
								onClick={this.onClickSetValue(key)}
								className={this.props.joinClasses(
									this.props.elem('key'),
									this.props.elem('key', this.props.cell.value === key ? 'current' : ''),
									this.props.elem('key', isOff ? 'off' : ''),
									this.props.elem('key', this.props.keyboardWrongValue === key ? 'wrong' : '')
								)}
							>{key}</div>);
						})}
					</div>

					<div
						onClick={this.onClickSetValue(0)}
						className={this.props.joinClasses(
							this.props.elem('key'),
							this.props.elem('key', this.props.cell.value === 0 ? 'current' : '')
						)}>clear
					</div>
				</div>
			</div>
		);
	}

	public componentDidMount() {
		window.addEventListener('keyup', this.onKeyPressSetValue);
	}

	public componentWillUnmount() {
		window.removeEventListener('keyup', this.onKeyPressSetValue);
	}
}

export default BEM(SudokuKeyboard, componentName);
