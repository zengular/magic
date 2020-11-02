import {Brick} from "zengular";
import twig    from "./magic-input-float.twig";
import "./magic-input-float.scss";
import magic   from "../../modules/magic";
import MagicInput from "./magic-input";


@Brick.register('magic-input-float', twig)
export default class MagicInputFloatBrick extends MagicInput {

	get value() {
		let value = parseFloat(this.$$('input').node.value);
		if (isNaN(value)) value = 0;
		return value;
	}

	set value(value) {
		value = parseFloat(value);
		if (isNaN(value)) value = 0;
		if (value % 1 === 0) value += '.0';
		this.$$("input").node.value = value;
	}

	onRender() {
		this.$$('input').listen('input', event => {
			let value = this.getValue();
			if (value % 1 === 0) value += '.0';
			event.target.value = value;
		})
	}

}
