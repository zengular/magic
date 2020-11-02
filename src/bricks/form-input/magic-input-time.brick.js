import {Brick} from "zengular";
import twig    from "./magic-input-time.twig";
import "./magic-input-time.scss";
import magic   from "../../modules/magic";
import MagicInput from "./magic-input";


@Brick.register('magic-input-time', twig)
export default class MagicInputTimeBrick extends MagicInput {}
