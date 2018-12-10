import * as _ from "lodash";
import * as React from "react";

export type fnBEMBlock = (mod?: string, modValue?: string) => string;
export type fnBEMElem = (nameElement: string, mod?: string, modValue?: string) => string;
export type fnBEMEJoinClasses = (...classes: any) => string;

export default class BEMComponent extends React.Component {
	protected componentName: string = 'BEMComponent';

	public block(mod: string = '', modValue: string = '') {
		let className = this.componentName;

		if (mod !== '') {
			className += ' ' + this.componentName + '--' + mod;
			if (modValue !== '') {
				className += '_' + modValue;
			}
		}

		return className;
	}

	public elem(nameElement: string, mod = '', modValue = '') {
		let className = this.componentName + '__' + nameElement;

		if (mod !== '') {
			className += ' ' + this.componentName + '__' + nameElement + '--' + mod;
			if (modValue !== '') {
				className += '_' + modValue;
			}
		}
		return className;
	}

	public joinClasses(...classes: any): string {
		let newClasses: string[] = [];
		let separator: string = ' ';

		_.map(classes, (classItem: string) => {
			let split = _.split(classItem, separator);
			newClasses = _.concat(split, newClasses)
		});

		return _.join(newClasses, separator);
	}
}
