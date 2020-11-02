import {Brick}                from "zengular";
import twig                   from "./magic-form-button-reload.twig";
import "./magic-form-button-reload.scss";
import MagicFormButton        from "./magic-form-button";
import {ZengularNotification} from "zengular-ui";

@Brick.register('magic-form-button-reload', twig)
export default class MagicFormButtonReloadBrick extends MagicFormButton {
	click() {
		this.form.load(this.dataset.id)
			.then(() => ZengularNotification.show(ZengularNotification.style.success, 'fas fa-thumbs-up', 'Item reloaded'))

	}
}
