import { TagSetterInterface } from "./tag-setter-interface";
import { DateTimeInterface } from "../../infrastructure/date-time-interface";

export interface TagSetterConstructor {
    new (dateTime: DateTimeInterface, onExistingTagBehaviour: string, addTimestamp: boolean) : TagSetterInterface;
}