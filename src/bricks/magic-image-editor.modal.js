import {modalify} from "zengular-ui";
import {Brick} from "zengular";
import twig    from "./magic-image-editor.twig";
import "./magic-image-editor.scss";
import Croppr  from "croppr";
import "croppr/dist/croppr.min.css"

@modalify()
@Brick.register('magic-image-editor', twig)
@Brick.renderOnConstruct(false)
export default class MagicImageEditorModal extends Brick {

	beforeRender(args) {
		this.img = args.url;
	}

	createViewModel() {
		return {img: this.img}
	}

	onRender() {
		this.$$('close').on.click(()=>this.close(false));
		this.$$('ratio').on.input((event, target)=>{
			if(target.checkValidity()){
				let ratio = parseInt(target.value.split(':')[1]) / parseInt(target.value.split(':')[0])
				this.cropInstance.options.aspectRatio = ratio;
			}else{
				this.cropInstance.options.aspectRatio = null;
				this.cropInstance.reset();
			}
		})
		this.$$('save').on.click(()=>{
			this.close(this.cropInstance.getValue())
		});
		this.$$('croppr').listen('load', (event, target)=>{
			this.cropInstance = new Croppr(this.$$('croppr').node, {
				onCropMove: (value)=>{
					this.$$('width').node.innerHTML = value.width;
					this.$$('height').node.innerHTML = value.height;
				}
			});
			this.cropInstance.reset();
		})
	}
}