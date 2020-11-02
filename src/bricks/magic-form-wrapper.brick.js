import {Brick}                from "zengular";
import twig                   from "./magic-form-wrapper.twig";
import "./magic-form-wrapper.scss";
import magic                  from "../modules/magic";
import {ZengularNotification} from "zengular-ui";


/**
 * @property {Object} tabView
 */
@Brick.register('magic-form-wrapper', twig)
export default class MagicFormWrapperBrick extends Brick {

	onInitialize() {
		this.handler = magic.getHandler(this.dataset.handler);
		this.head = {};
		this.item = {};
	}

	createViewModel() {

		let buttons = this.handler.form.button.map(button => {
			if (typeof button === 'function') {
				return {
					tag: button.tag,
					data: {}
				}
			}
			return {
				tag: button.button.tag,
				data: button.data
			}
		});
		return {
			handler: this.handler,
			form: this.handler.form.brick.tag,
			buttons: buttons,
			head: this.head,
			item: this.item,
			id: this.id
		}
	}

	load(id) {
		return this.handler.fetch.get(id)
			.then(res => res.json())
			.then(data => {
				this.id = data.id;
				this.item = data.item;
				this.props = data.props;
				this.head = this.handler.form.setup(this.id, this.item);
				this.tab.view.icon = this.handler.icon.small;
			})
			.then(() => this.render())
			.then(() => this.$$('form-body').brick.setup(this.item, this.props));
	}

	onRender() { this.$$('form-button').each(button => button.controller.form = this);}

	remove() { this.tab.remove();}

	@Brick.listen(magic.event.save)
	__save(event) {
		this.$$('form-body').brick.clearErrors();
		let data = this.$$('form-body').brick.data;
		if (!(data instanceof Promise)) data = Promise.resolve(data);
		data
			.catch(errors => {
				errors.forEach(error => {
					ZengularNotification.show(ZengularNotification.style.danger, 'fas fa-exclamation-triangle', `<b>${error.as}</b><br>${error.message}`);
					this.$$('form-body').brick.error(error.as, error.message);
				});
				throw 'error'
			})
			.then(data => this.handler.fetch.save(this.id, data))
			.then(res => {
				if (res.status === 200) {
					res.json()
						.then(data => this.load(data.id))
						.then(() => {
							this.fire(magic.event.itemChanged, {handler: this.handler.name});
							this.tab.render();
						})
						.then(() => ZengularNotification.show(ZengularNotification.style.success, 'fas fa-thumbs-up', 'Item saved'))
				} else {
					res.json()
						.then(errors => {
							errors.forEach(error => {
								ZengularNotification.show(ZengularNotification.style.danger, 'fas fa-exclamation-triangle', `<b>${error.field}</b><br>${error.message}`);
								this.$$('form-body').brick.error(error.field, error.message);
							});
						})
				}
			})
			.catch(() => {})


	}

}

