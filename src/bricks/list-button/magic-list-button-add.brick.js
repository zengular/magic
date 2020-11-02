import {Brick} from "zengular";
import twig    from "./magic-list-button-add.twig";
import "./magic-list-button-add.scss";
import magic   from "../../modules/magic";

@Brick.register('magic-list-button-add', twig)
export default class MagicListButtonAddBrick extends Brick {

	onRender() {
		this.$$('button').on.mouse.click((event, target)=>{
			this.fire(magic.event.addNewItem);
		})
	}

}
