import {Brick}    from "zengular";
import twig       from "./magic-input-checkbox.twig";
import "./magic-input-checkbox.scss";
import MagicInput from "./magic-input";


@Brick.register('magic-input-checkbox', twig)
export default class MagicInputCheckboxBrick extends MagicInput {

	set value(value) { this.$$('input').node.checked = value;}
	get value() {return this.$$('input').node.checked;}

}
