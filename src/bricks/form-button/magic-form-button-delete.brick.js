import {Brick}                from "zengular";
import twig                   from "./magic-form-button-delete.twig";
import "./magic-form-button-delete.scss";
import magic                  from "../../modules/magic";
import MagicFormButton        from "./magic-form-button";
import {ZengularNotification} from "zengular-ui";


@Brick.register('magic-form-button-delete', twig)
export default class MagicFormButtonDeleteBrick extends MagicFormButton {

	click() {
		if (confirm('Are you sure you want to delete this item?')) {
			this.handler.fetch.delete(this.dataset.id)
				.then(() => this.fire(magic.event.itemChanged, {handler: this.handler.name, id: this.dataset.id}))
				.then(() => this.form.remove())
				.then(() => ZengularNotification.show(ZengularNotification.style.success, 'fas fa-thumbs-up', 'Item deleted'))
		}
	}

}
