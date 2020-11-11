import {Brick} from "zengular";
import magic   from "../../modules/magic";


export default class MagicListCardBrick extends Brick {

	get size() {return "large"; }

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

	init(id, item) { return {}; }

	select() { this.fire(magic.event.selectItem, {id: this.id})}

}
