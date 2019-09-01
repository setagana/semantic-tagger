import { expect } from "chai";
import { TagSetter } from "../../../application/tag-setter/tag-setter";
import { DateTimeInterface } from "../../../infrastructure/date-time-interface";

function TagSetterTests() {
    it("should honor the existing tag if behaviour is set to honor and tag is present", () => {
        let dateTime = new MockDateTime();
        let tagSetter = new TagSetter(dateTime, "honor", false);
        let releaseVersion = "1.0.0";
        let existingTag = "beta03";
        let metadata = "";
        let inputPrefix = "";

        let result = tagSetter.getTaggedSemanticVersion(releaseVersion, existingTag, metadata, inputPrefix);

        expect(result).to.equal("1.0.0-beta03");
    });

    it("should determine its own tag if behaviour is set to honor and no tag is present", () => {
        let dateTime = new MockDateTime();
        let tagSetter = new TagSetter(dateTime, "honor", true);
        let releaseVersion = "1.0.0";
        let existingTag = "";
        let metadata = "";
        let inputPrefix = "";

        let result = tagSetter.getTaggedSemanticVersion(releaseVersion, existingTag, metadata, inputPrefix);

        expect(result).to.equal("1.0.0-alphaDummyTimestamp");
    });

    it("should add a timestamp to the existing tag if task behaviour is set to honor and timestamp", () => {
        let dateTime = new MockDateTime();
        let tagSetter = new TagSetter(dateTime, "honor", true);
        let releaseVersion = "1.0.0";
        let existingTag = "beta03";
        let metadata = "";
        let inputPrefix = "";

        let result = tagSetter.getTaggedSemanticVersion(releaseVersion, existingTag, metadata, inputPrefix);

        expect(result).to.equal("1.0.0-beta03DummyTimestamp");
    });

    it("should overwrite the existing tag if behaviour is set to overwrite", () => {
        let dateTime = new MockDateTime();
        let tagSetter = new TagSetter(dateTime, "overwrite", false);
        let releaseVersion = "1.0.0";
        let existingTag = "beta03";
        let metadata = "";
        let inputPrefix = "internal";

        let result = tagSetter.getTaggedSemanticVersion(releaseVersion, existingTag, metadata, inputPrefix);

        expect(result).to.equal("1.0.0-internal");
    });

    
    it("should add a timestamp to its own tag if task behaviour is set to overwrite and timestamp", () => {
        let dateTime = new MockDateTime();
        let tagSetter = new TagSetter(dateTime, "overwrite", true);
        let releaseVersion = "1.0.0";
        let existingTag = "beta03";
        let metadata = "";
        let inputPrefix = "internal";

        let result = tagSetter.getTaggedSemanticVersion(releaseVersion, existingTag, metadata, inputPrefix);

        expect(result).to.equal("1.0.0-internalDummyTimestamp");
    });

    it("should throw an error if an existing tag exists and behaviour is set to error", () => {
        let dateTime = new MockDateTime();
        let tagSetter = new TagSetter(dateTime, "error", false);
        let releaseVersion = "1.0.0";
        let existingTag = "beta03";
        let metadata = "";
        let inputPrefix = "";

        expect(tagSetter.getTaggedSemanticVersion.bind(tagSetter, releaseVersion, existingTag, metadata, inputPrefix)).to.throw("The provided semantic version contains a prerelease tag, and this task is set to fail if a prerelease tag already exists. The existing tag is: beta03");
    });

    it("should preserve metadata if metadata is provided", () => {
        let dateTime = new MockDateTime();
        let tagSetter = new TagSetter(dateTime, "error", false);
        let releaseVersion = "1.0.0";
        let existingTag = "";
        let metadata = "DummyMetadata";
        let inputPrefix = "";

        let result = tagSetter.getTaggedSemanticVersion(releaseVersion, existingTag, metadata, inputPrefix);

        expect(result).to.equal("1.0.0-alpha+DummyMetadata");
    });

    it("should use the input prefix if it is provided", () => {
        let dateTime = new MockDateTime();
        let tagSetter = new TagSetter(dateTime, "error", false);
        let releaseVersion = "1.0.0";
        let existingTag = "";
        let metadata = "";
        let inputPrefix = "internal";

        let result = tagSetter.getTaggedSemanticVersion(releaseVersion, existingTag, metadata, inputPrefix);

        expect(result).to.equal("1.0.0-internal");
    });

    class MockDateTime implements DateTimeInterface {
        getTimestamp(): string {
            return "DummyTimestamp";
        }
    };
}

export { TagSetterTests };