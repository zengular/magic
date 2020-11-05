import {Brick}            from "zengular";
import twig               from "./magic-list-card-avatar.twig";
import "./magic-list-card-avatar.scss";
import MagicListCardBrick from "./magic-list-card";


@Brick.register('magic-list-card-avatar', twig)
export default class MagicListCardAvatarBrick extends MagicListCardBrick {
	onRender(viewModel) {
		if (viewModel.data.head.status === false) this.root.classList.add('faded');
	}
}
