import {Brick}                from "zengular";
import twig                   from "./magic-form-button-custom.twig";
import "./magic-form-button-custom.scss";
import magic                  from "../../modules/magic";
import MagicFormButton        from "./magic-form-button";
import {ZengularNotification} from "zengular-ui";


@Brick.register('magic-form-button-custom', twig)
export default class MagicFormButtonCustomBrick extends MagicFormButton {

	createViewModel() {
		let viewmodel = super.createViewModel();
		viewmodel.icon = this.dataset.icon;
		return viewmodel;
	}

	click() {
		this.handler[this.dataset.method](this.form.item);
	}

}
