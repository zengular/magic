import {Brick}         from "zengular";
import twig            from "./magic-form-button-files.twig";
import "./magic-form-button-files.scss";
import magic           from "../../modules/magic";
import MagicFormButton from "./magic-form-button";

@Brick.register('magic-form-button-files', twig)
export default class MagicFormButtonFilesBrick extends MagicFormButton {
	createViewModel() { return {id: this.dataset.id}}

	click() {

	}

}
