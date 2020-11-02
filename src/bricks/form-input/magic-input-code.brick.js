import {Brick}    from "zengular";
import twig       from "./magic-input-code.twig";
import "./magic-input-code.scss";
import MagicInput from "./magic-input";
import * as  indentation  from 'indent-textarea';


@Brick.register('magic-input-code', twig)
export default class MagicInputCodeBrick extends MagicInput {

	onRender() {
		super.onRender();
		indentation.watch(this.$$("input").node);
	}

}
