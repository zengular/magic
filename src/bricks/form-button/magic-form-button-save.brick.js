import {Brick}         from "zengular";
import twig            from "./magic-form-button-save.twig";
import "./magic-form-button-save.scss";
import MagicFormButton from "./magic-form-button";
import magic           from "../../modules/magic";

@Brick.register('magic-form-button-save', twig)
export default class MagicFormButtonSaveBrick extends MagicFormButton {

	onRender() {
		this.$$('button').on.mouse.click((event, target) => {
			this.fire(magic.event.save);
		})
	}

}
