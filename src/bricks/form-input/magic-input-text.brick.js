import {Brick}                        from "zengular";
import twig                           from "./magic-input-text.twig";
import "./magic-input-text.scss";
import MagicInput                     from "./magic-input";
import MagicInputTextEditorModalBrick
                                      from "./helper/magic-input-text-editor-modal.brick";


@Brick.register('magic-input-text', twig)
export default class MagicInputTextBrick extends MagicInput {

	static setAttributes(editor) {
		if(typeof editor === "function") editor = editor.tag;
		return {editor};
	}

	onRender() {
		this.$$('open-editor').listen('click', (event) => {
			MagicInputTextEditorModalBrick.modalify({input: this, editor: this.attributes.editor, attributes: this.attributes});
		});
	}
}
