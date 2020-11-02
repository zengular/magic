import {Brick}    from "zengular";
import twig       from "./magic-input-text.twig";
import "./magic-input-text.scss";
import MagicInput from "./magic-input";


@Brick.register('magic-input-text', twig)
export default class MagicInputTextBrick extends MagicInput {}
