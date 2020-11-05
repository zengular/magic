import {Brick} from "zengular";
import twig    from "./magic-input-integer.twig";
import "./magic-input-integer.scss";
import magic   from "../../modules/magic";
import MagicInput from "./magic-input";


@Brick.register('magic-input-integer', twig)
export default class MagicInputIntegerBrick extends MagicInput {


	get value() {
		let value = parseInt(this.$$('input').node.value);
		if (isNaN(value)) value = 0;
		return value;
	}

	set value(value) {
		value = parseInt(value);
		if (isNaN(value)) value = 0;
		this.$$("input").node.value = value;
	}

	onRender() {
		this.$$('input').listen('input', event => {
			event.target.value = this.value;
		})
	}

}
