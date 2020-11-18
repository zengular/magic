import {Brick}        from "zengular";
import twig           from "./magic.twig";
import "./magic.scss";
import magic          from "../modules/magic";
import MagicListBrick from "./magic-list.brick";


@Brick.register('magic', twig)
export default class MagicBrick extends Brick {

	findList(name) {return this.$$('list').filter('[data-handler=' + name + ']').node;}

	@Brick.listen(magic.event.itemChanged)
	__reloadList(event) {
		let list = this.$$('list').filter('[data-handler=' + event.data.handler + ']').brick;
		if (list !== null && typeof list.loadList === "function") list.loadList();
	}

	@Brick.listen(magic.event.menuHandlerSelected)
	__menuHandlerSelected(event) {
		let list = this.findList(event.data.handler);
		if (list === null) {
			let handler = magic.getHandler(event.data.handler);
			handler.list.create('div', true, {handler: event.data.handler})
				.then(list => this.root.prepend(list.root));
		}else this.root.prepend(list)
	}

	@Brick.listen([magic.event.selectItem, magic.event.addNewItem])
	__openTab(event) { this.$$('tabs').brick.open(event.data)}

	@Brick.listen(magic.event.activateForm)
	__appendForm(event) { this.root.append(event.data.form.root);}

}
