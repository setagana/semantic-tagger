import { expect } from "chai";
import { InputHandler } from "../../../application/input-handler/input-handler";

function InputHandlerTests() {
    it("should validate simple semantic versions", () => {
        let inputHandler = new InputHandler();
        let version = "1.0.0";

        let result = inputHandler.isValidSemanticVersion(version);

        expect(result).to.equal(true);
    });

    it("should validate semantic versions with a prerelease tag", () => {
        let inputHandler = new InputHandler();
        let version = "1.0.0-alpha01";

        let result = inputHandler.isValidSemanticVersion(version);

        expect(result).to.equal(true);
    });

    it("should invalidate semantic versions with leading zeroes", () => {
        let inputHandler = new InputHandler();
        let version = "01.02.03";

        let result = inputHandler.isValidSemanticVersion(version);

        expect(result).to.equal(false);
    });

    it("should invalidate semantic versions with negative integers", () => {
        let inputHandler = new InputHandler();
        let version = "-1.0.0";

        let result = inputHandler.isValidSemanticVersion(version);

        expect(result).to.equal(false);
    });

    it("should invalidate semantic versions with only Major and Minor integers", () => {
        let inputHandler = new InputHandler();
        let version = "1.0";

        let result = inputHandler.isValidSemanticVersion(version);

        expect(result).to.equal(false);
    });

    it("should invalidate semantic versions with only a Major integer", () => {
        let inputHandler = new InputHandler();
        let version = "1";

        let result = inputHandler.isValidSemanticVersion(version);

        expect(result).to.equal(false);
    });

    it("should invalidate prerelease tags with non-alphanumeric, non-hypen or non-period characters", () => {
        let inputHandler = new InputHandler();
        let version = "1.0.0-alpha%";

        let result = inputHandler.isValidSemanticVersion(version);

        expect(result).to.equal(false);
    });

    it("should invalidate prerelease tags with empty identifiers", () => {
        let inputHandler = new InputHandler();
        let version = "1.0.0-alpha..1";

        let result = inputHandler.isValidSemanticVersion(version);

        expect(result).to.equal(false);
    });

    it("should invalidate prerelease tag identifiers with leading zeroes", () => {
        let inputHandler = new InputHandler();
        let version = "1.0.0-alpha.01.test";

        let result = inputHandler.isValidSemanticVersion(version);

        expect(result).to.equal(false);
    });

    it("should validate prefixes containing only alphanumeric characters", () => {
        let inputHandler = new InputHandler();
        let prefix = "alpha01";

        let result = inputHandler.isValidPrefix(prefix);

        expect(result).to.equal(true);
    });

    it("should validate empty prefixes", () => {
        let inputHandler = new InputHandler();
        let prefix = "";

        let result = inputHandler.isValidPrefix(prefix);

        expect(result).to.equal(true);
    });

    it("should validate prefixes containing hyphens", () => {
        let inputHandler = new InputHandler();
        let prefix = "Alpha-Beta-01";

        let result = inputHandler.isValidPrefix(prefix);

        expect(result).to.equal(true);
    });

    it("should invalidate prefixes containing periods", () => {
        let inputHandler = new InputHandler();
        let prefix = "alpha.beta";

        let result = inputHandler.isValidPrefix(prefix);

        expect(result).to.equal(false);
    });

    it("should invalidate prefixes containing other invalid characters", () => {
        let inputHandler = new InputHandler();
        let prefix = "alpha^beta";

        let result = inputHandler.isValidPrefix(prefix);

        expect(result).to.equal(false);
    });

    it("should return an empty string tag on a simple semantic version", () => {
        let inputHandler = new InputHandler();
        let version = "1.0.0";

        let result = inputHandler.splitVersionTag(version);

        expect(result[0]).to.equal("1.0.0");
        expect(result[1]).to.equal("");
        expect(result[2]).to.equal("");
    });

    it("should return the version and tag when only a tag is present", () => {
        let inputHandler = new InputHandler();
        let version = "1.0.0-alpha01";

        let result = inputHandler.splitVersionTag(version);

        expect(result[0]).to.equal("1.0.0");
        expect(result[1]).to.equal("alpha01");
        expect(result[2]).to.equal("");
    });

    it("should return a single tag when multiple hyphens are used", () => {
        let inputHandler = new InputHandler();
        let version = "1.0.0-alpha-beta-01";

        let result = inputHandler.splitVersionTag(version);

        expect(result[0]).to.equal("1.0.0");
        expect(result[1]).to.equal("alpha-beta-01");
    });

    it("should return the version and metadata when only metadata is present", () => {
        let inputHandler = new InputHandler();
        let version = "1.0.0+exp-sha.5114f85";

        let result = inputHandler.splitVersionTag(version);

        expect(result[0]).to.equal("1.0.0");
        expect(result[1]).to.equal("");
        expect(result[2]).to.equal("exp-sha.5114f85");
    });

    it("should return the version, tag and metadata when all three are present", () => {
        let inputHandler = new InputHandler();
        let version = "1.0.0-alpha01+exp.sha.5114f85";

        let result = inputHandler.splitVersionTag(version);

        expect(result[0]).to.equal("1.0.0");
        expect(result[1]).to.equal("alpha01");
        expect(result[2]).to.equal("exp.sha.5114f85");
    });
}

export { InputHandlerTests };