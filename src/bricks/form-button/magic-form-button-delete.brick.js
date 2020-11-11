import {Brick}                from "zengular";
import magic                  from "../../modules/magic";
import MagicFormButton        from "./magic-form-button";
import {ZengularNotification} from "zengular-ui";


export default class MagicFormButtonDeleteBrick extends MagicFormButton {
	get icon(){ return "fal fa-times";}
	get title(){ return "delete";}
	get visible(){ return this.id;}

	click() {
		if (confirm('Are you sure you want to delete this item?')) {
			this.form.handler.fetch.delete(this.form.id)
				.then(() => this.fire(magic.event.itemChanged, {handler: this.form.handler.name, id: this.form.id}))
				.then(() => this.form.remove())
				.then(() => ZengularNotification.show(ZengularNotification.style.success, 'fas fa-thumbs-up', 'Item deleted'))
		}
	}

}
