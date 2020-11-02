import {Brick} from "zengular";
import twig    from "./magic-input-color.twig";
import "./magic-input-color.scss";
import magic   from "../../modules/magic";
import MagicInput from "./magic-input";


@Brick.register('magic-input-color', twig)
export default class MagicInputColorBrick extends MagicInput {}
