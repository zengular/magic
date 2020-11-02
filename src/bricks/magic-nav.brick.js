import {Brick} from "zengular";
import twig    from "./magic-nav.twig";
import "./magic-nav.scss";
import magic   from "../modules/magic";


@Brick.register('magic-nav', twig)
export default class MagicNavBrick extends Brick {

	onInitialize() {}

	createViewModel() { return {user: magic.user};}

	onRender() {}

}