import magic       from "../../modules/magic";
import MagicButton from "../magic-button/magic-button";


export default class MagicListButtonAddBrick extends MagicButton {
	get icon() { return "fal fa-plus"; }
	get title() { return "Create new"; }
	click() { this.fire(magic.event.addNewItem); }
}
