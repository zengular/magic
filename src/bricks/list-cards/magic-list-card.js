import {Brick} from "zengular";
import magic   from "../../modules/magic";


export default class MagicListCardBrick extends Brick {

	onInitialize() { this.root.addEventListener('click', this.select.bind(this))}

	beforeRender(args) {
		this.item = args.item;
		this.id = args.id;
		this.handler = magic.getHandler(this.dataset.handler);
	}

	createViewModel() {
		return {
			data: (typeof this.handler.list.card.setup === 'function') ? this.handler.list.card.setup(this.id, this.item) : {},
			id: this.id,
			item: this.item,
			handler: this.handler
		}
	}

	select() { this.fire(magic.event.selectItem, {id: this.id})}

}
