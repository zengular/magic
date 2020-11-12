import MagicButton            from "../magic-button/magic-button";
import {ZengularNotification} from "zengular-ui";


export default class MagicFormButtonReloadBrick extends MagicButton {
	get icon(){ return "fal fa-recycle";}
	get title(){ return "files";}
	get visible(){ return this.id;}
	click() {
		this.form.load(this.form.id)
			.then(() => ZengularNotification.show(ZengularNotification.style.success, 'fas fa-thumbs-up', 'Item reloaded'))
	}
}
