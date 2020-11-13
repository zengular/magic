import {Brick} from "zengular";
import magic   from "../../modules/magic";


export default class MagicListCardBrick extends Brick {

	get size() {return "large"; }

	get id() { return this._id; }
	set id(id) { this._id = id;}
	get guid() { return this.item.guid ? this.item.guid : null; }
	get label() { return this.id; }
	get properties() { return null; }
	get status(){ return true; }
	get icon(){ return false; }

	onInitialize() {
		this.root.addEventListener('click', this.select.bind(this));
		this.root.classList.add(this.size);
	}

	beforeRender(args) {
		this.item = args.item;
		this.id = args.id;
		this.handler = magic.getHandler(this.dataset.handler);
	}

	createViewModel() {
		return {
			data: this.init(this.id, this.item),
			id: this.id,
			item: this.item,
			handler: this.handler
		}
	}

	init(id, item) {
		return {
			head: {
				id: this.item.id,
				guid: this.guid,
				label: this.label,
				status: this.status,
				icon: this.icon
			},
			properties: this.properties
		};
	}

	select() { this.fire(magic.event.selectItem, {id: this.id})}

}
