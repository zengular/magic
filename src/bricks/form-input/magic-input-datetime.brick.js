import {Brick}         from "zengular";
import twig            from "./magic-input-datetime.twig";
import "./magic-input-datetime.scss";
import MagicInput      from "./magic-input";
import {datetimeLocal} from "zengular-util";


@Brick.register('magic-input-datetime', twig)
export default class MagicInputDatetimeBrick extends MagicInput {
	get value() {return datetimeLocal(this.$$('input').node.value, true, true);}
	set value(value) {this.$$("input").node.value = datetimeLocal(value, true);}
}
