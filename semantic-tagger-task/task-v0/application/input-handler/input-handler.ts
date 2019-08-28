import { InputHandlerConstructor } from "./input-handler-constructor";
import { InputHandlerInterface } from "./input-handler-interface";

const InputHandler: InputHandlerConstructor = class InputHandler implements InputHandlerInterface {
    constructor() {}

    isValidSemanticVersion(version: string): boolean {
        let validSemVerPattern = new RegExp(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?$/);
        return validSemVerPattern.test(version);
    }
        
    isValidPrefix(prefix: string): boolean {
        let validPrefixPattern = new RegExp(/^[0-9a-zA-Z-]{1,30}$/);
        return validPrefixPattern.test(prefix);
    }

    splitVersionTag(version: string): [string, string, string] {
        return [this.extractReleaseVersion(version), this.extractTag(version), this.extractMetadata(version)];
    }

    private extractMetadata(version: string): string {
        let plusIndex = version.indexOf("+");
        
        if (plusIndex === -1) return "";
        return version.slice(plusIndex + 1, version.length);
    }

    private extractTag(version: string): string {
        let hyphenIndex = version.indexOf("-");
        let plusIndex = version.indexOf("+");
        
        // If there is no hyphen, there is definitely no tag - return nothing
        if (hyphenIndex === -1) return "";
        // If there is a hyphen before a plus, there is a tag inbetween the two
        if (hyphenIndex < plusIndex) return version.slice(hyphenIndex + 1, plusIndex);
        // There is a hyphen, and as long as it's not part of metadata (there is no plus in the version) then the hyphen is the start of a tag
        if (plusIndex === -1 )return version.slice(hyphenIndex + 1, version.length);
        // There is a hyphen, but it is part of metadata, so we have no tag
        return "";
    }

    private extractReleaseVersion(version: string): string {
        let hyphenIndex = version.indexOf("-");
        let plusIndex = version.indexOf("+");

        // If we have neither hyphen nor plus, return the whole version
        if (hyphenIndex === -1 && plusIndex === -1) return version;
        // If we have both a hyphen and a plus, return the substring from index 0 to the lower of the two
        if (hyphenIndex > -1 && plusIndex > -1) return version.slice(0, hyphenIndex).slice(0, plusIndex);
        // We must only have one or the other, return the substring from index 0 to the index which is not negative
        let specialCharIndex = hyphenIndex > -1 ? hyphenIndex : plusIndex;
        return version.slice(0, specialCharIndex);
    }
}

export { InputHandler };