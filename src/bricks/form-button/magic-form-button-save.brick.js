import MagicButton            from "../magic-button/magic-button";
import magic           from "../../modules/magic";

export default class MagicFormButtonSaveBrick extends MagicButton {
	get icon(){ return "fal fa-save";}
	get title(){ return "save";}
	click() { this.fire(magic.event.save);}
}
