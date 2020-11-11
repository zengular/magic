import MagicFormButton from "./magic-form-button";
import magic           from "../../modules/magic";

export default class MagicFormButtonSaveBrick extends MagicFormButton {
	get icon(){ return "fal fa-save";}
	get title(){ return "save";}
	click() { this.fire(magic.event.save);}
}
