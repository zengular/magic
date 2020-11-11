import {Brick}                from "zengular";
import MagicFormButton        from "./magic-form-button";
import {ZengularNotification} from "zengular-ui";

export default class MagicFormButtonReloadBrick extends MagicFormButton {
	get icon(){ return "fal fa-recycle";}
	get title(){ return "files";}
	get visible(){ return this.id;}
	click() {
		this.form.load(this.form.id)
			.then(() => ZengularNotification.show(ZengularNotification.style.success, 'fas fa-thumbs-up', 'Item reloaded'))
	}
}
