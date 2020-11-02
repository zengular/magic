import {Brick} from "zengular";
import twig    from "./magic-input-date.twig";
import "./magic-input-date.scss";
import MagicInput from "./magic-input";

@Brick.register('magic-input-date', twig)
export default class MagicInputDateBrick extends MagicInput {
	set value(value){
		value = value.substr(0,10);
		this.$$('input').node.value = value;
	}

}
