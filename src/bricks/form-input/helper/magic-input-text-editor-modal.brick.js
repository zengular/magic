import {Brick}    from "zengular";
import {modalify} from "zengular-ui";
import twig       from "./magic-input-text-editor-modal.twig";
import "./magic-input-text-editor-modal.scss";

@modalify()
@Brick.register('magic-input-text-editor-modal', twig)
export default class MagicInputTextEditorModalBrick extends Brick {

	onRender() {
		this.$$('close').listen('click', () =>{
			this.input.value = this.$$('editor').brick.value;
			this.close();
		});
		this.$$('editor').brick.render({attributes: this.attributes, value: this.input.value});
	}

	beforeRender(args) {
		this.attributes = args.attributes;
		this.editor = args.editor;
		this.input = args.input;
	}

	createViewModel() {
		return {
			editor: this.editor
		}
	}
}