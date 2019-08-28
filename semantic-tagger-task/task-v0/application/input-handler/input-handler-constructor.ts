import { InputHandlerInterface } from "./input-handler-interface";

export interface InputHandlerConstructor {
    new () : InputHandlerInterface;
}