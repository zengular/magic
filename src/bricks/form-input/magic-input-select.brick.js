import {Brick}    from "zengular";
import twig       from "./magic-input-select.twig";
import "./magic-input-select.scss";
import MagicInput from "./magic-input";


@Brick.register('magic-input-select', twig)
export default class MagicInputSelectBrick extends MagicInput {}
