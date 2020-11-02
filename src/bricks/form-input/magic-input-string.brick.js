import {Brick}    from "zengular";
import twig       from "./magic-input-string.twig";
import "./magic-input-string.scss";
import magic      from "../../modules/magic";
import MagicInput from "./magic-input";

@Brick.register('magic-input-string', twig)
export default class MagicInputStringBrick extends MagicInput {}
