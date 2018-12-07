import * as React from "react";

class BEMClass extends React.Component {
	protected componentName = '';

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
}


export default BEMClass;
