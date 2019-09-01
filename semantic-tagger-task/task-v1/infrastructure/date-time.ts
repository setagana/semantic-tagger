import { DateTimeConstructor } from "./date-time-constructor";
import { DateTimeInterface } from "./date-time-interface";
import moment from 'moment';

const DateTime: DateTimeConstructor = class DateTime implements DateTimeInterface {
    constructor() {}

    getTimestamp(): string {
        return moment().unix().toString();
    }
}

export { DateTime };