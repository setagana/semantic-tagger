import { TagSetterConstructor } from "./tag-setter-constructor";
import { TagSetterInterface } from "./tag-setter-interface";
import { DateTimeInterface } from "../../infrastructure/date-time-interface";

const TagSetter: TagSetterConstructor = class TagSetter implements TagSetterInterface {
    private dateTime: DateTimeInterface;
    private existingTagBehaviour: string;
    private addTimestampToTag: boolean;

    constructor(dateTimeService: DateTimeInterface, onExistingTagBehaviour: string, addTimestamp: boolean) {
        this.existingTagBehaviour = onExistingTagBehaviour;
        this.addTimestampToTag = addTimestamp;
        this.dateTime = dateTimeService;
    }

    getTaggedSemanticVersion(releaseVersion: string, existingTag: string, metadata: string, inputPrefix: string): string {
        let finalTag = this.determineTag(existingTag, inputPrefix);
        let finalVersion = `${releaseVersion}-${finalTag}`;
        if (metadata !== "") finalVersion = `${finalVersion}+${metadata}`;
        return finalVersion;
    }

    private determineTag(existingTag: string, inputPrefix: string): string {
        let prefix = this.determineFinalPrefix(existingTag, inputPrefix);
        let timestamp = this.addTimestampToTag ? this.dateTime.getTimestamp() : "";

        return `${prefix}${timestamp}`;
    }

    private determineFinalPrefix(existingTag: string, inputPrefix: string): string {
        let taskPrefix = inputPrefix !== "" ? inputPrefix : "alpha";
        
        if (existingTag !== "") {
            switch (this.existingTagBehaviour) {
                case "honor":
                    return existingTag;
                case "overwrite":
                    return taskPrefix;
                case "error":
                    throw `The provided semantic version contains a prerelease tag, and this task is set to fail if a prerelease tag already exists. The existing tag is: ${existingTag}`;
                default:
                    throw "An unexpected value was provided for how to handle an existing prerelease tag. Expect values are 'honor', 'overwrite' and 'error'.";
            }
        }

        return taskPrefix;
    }
}

export { TagSetter };