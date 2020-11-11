import {Brick} from "zengular";
import twig from "./magic-form-wrapper.twig";
import "./magic-form-wrapper.scss";
import magic from "../modules/magic";
import {ZengularNotification} from "zengular-ui";


/**
 * @property {Object} tabView
 */
@Brick.register('magic-form-wrapper', twig)
@Brick.addClass('form')
@Brick.renderOnConstruct(false)
export default class MagicFormWrapperBrick extends Brick {

	onInitialize() {
		this.head = {};
		this.item = {};
	}

	setup(data) {
		this.id = data.id;
		this.handler = magic.getHandler(data.handler);
		this.load(this.id);
	}

	createViewModel() {
		let buttons = this.handler.form.button.map(button => typeof button === 'function' ?
			{tag: button.tag, data: {}, render: true}
			: {
				tag: button.button.tag,
				data: button.data,
				render: button.role ? magic.user.hasRole(button.role) : true
			}
		);
		let form = {
			tag: typeof this.handler.form.brick === 'function' ? this.handler.form.brick.tag : this.handler.form.brick.brick.tag,
			data: typeof this.handler.form.brick === 'function' ? {} : this.handler.form.brick.data
		}
		return {
			form: form,
			buttons: buttons,
			handler: this.handler,
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
				this.tab.label = this.head.id ? 'id: ' + this.head.id : 'new';
				this.tab.title = this.head.label ? this.head.label : this.handler.translate('label.form');
				this.tab.icon = this.handler.translate('icon.small', 'fad fa-rocket');
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
						.then(() => this.fire(magic.event.itemChanged, {handler: this.handler.name}))
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

