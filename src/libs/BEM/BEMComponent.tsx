import * as _ from "lodash";
import * as React from "react";

export default class BEMComponent extends React.Component {
	public componentName: string;

	constructor(props: any) {
		super(props);

		this.componentName = 'BEMComponent';
	}

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

	public joinClasses(...classes: string[]): string {
		return _.join(_.uniq(classes), ' ');
	}
}
