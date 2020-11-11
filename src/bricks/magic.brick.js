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
		if (list !== null) list.loadList();
	}

	@Brick.listen(magic.event.menuHandlerSelected)
	__menuHandlerSelected(event) {
		let list = this.findList(event.data.handler);
		if (list === null) {
			list = MagicListBrick.createBrickElement();
			list.dataset.handler = event.data.handler;
			this.root.appendChild(list);
		}
		this.root.prepend(list)
	}

	@Brick.listen([magic.event.selectItem, magic.event.addNewItem])
	__openTab(event) { this.$$('tabs').brick.open(event.data)}

	@Brick.listen(magic.event.activateForm)
	__appendForm(event) { this.root.append(event.data.form.root);}

}
