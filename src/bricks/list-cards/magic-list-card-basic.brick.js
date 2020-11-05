import {Brick}            from "zengular";
import twig               from "./magic-list-card-basic.twig";
import "./magic-list-card-basic.scss";
import MagicListCardBrick from "./magic-list-card";

@Brick.register('magic-list-card-basic', twig)
export default class MagicListCardBasicBrick extends MagicListCardBrick {
	onRender(viewModel) {
		if (viewModel.data.head.status === false) this.root.classList.add('faded');
	}
}
