import {Brick} from "zengular";
import "./magic-menu.scss";
import magic   from "../modules/magic";

export default class MagicMenuBrick extends Brick{
	onRender() {
		this.$('.label').on.mouse.click((event, target) => target.parentElement.classList.toggle('open'));
		this.$$('item').filter("[data-handler]").each(node=>{
			let handler = magic.getHandler(node.dataset.handler);
			node.innerHTML = `<i class="${handler.icon.small}"></i>${handler.label}`;
		});
		this.$$('item').filter("[data-handler]").on.click((event, target)=>{
			this.fire(magic.event.menuHandlerSelected, {handler: target.dataset.handler});
		})
	}
}


