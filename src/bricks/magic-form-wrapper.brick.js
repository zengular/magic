import {Brick}                from "zengular";
import twig                   from "./magic-form-wrapper.twig";
import "./magic-form-wrapper.scss";
import magic                  from "../modules/magic";
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
		return {
			handler: this.handler,
			head: this.head,
			item: this.item,
			id: this.id
		}
	}

	get id() {return this._id;}
	set id(id) { this._id = id;}
	get label(){ return this.id; }
	get guid() { return this.item.guid ? this.item.guid : null; }


	init(id, item) {
		return {id: this.id, label: this.label, guid: this.guid};
	}


	load(id) {
		return this.handler.fetch.get(id)
			.then(res => res.json())
			.then(data => {
				this.id = data.id;
				this.item = data.item;
				this.attributes = data.attributes;
				this.head = this.init(this.id, this.item);
				this.tab.label = this.head.id ? 'id: ' + this.head.id : 'new';
				this.tab.title = this.head.label ? this.head.label : this.handler.translate('label.form');
				this.tab.icon = this.handler.translate('icon.small', 'fad fa-rocket');
			})
			.then(() => this.render())
			.then(() => this.$$('form-body').brick.setup(this.item, this.attributes));
	}

	onRender() {
		this.buttons.forEach(button => {
			let btn;
			button.create('div', false)
				.then(btn => {
					btn.form = this;
					this.$$('nav').node.append(btn.root);
					btn.render();
				});
		});
		return this.form.create('div', false, {handler: this.handler.name})
			.then(form => {
				form.actor('form-body');
				this.root.appendChild(form.root)
			})
	}

	render(args = undefined) {return super.render(args);}

	remove() { this.tab.remove(); }

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

