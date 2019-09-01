import taskLibrary = require('azure-pipelines-task-lib/task');
import { InputHandler } from './application/input-handler/input-handler';
import { TagSetter } from './application/tag-setter/tag-setter';
import { DateTime } from "./infrastructure/date-time"

async function run() {
    const variableName = "TaggedSemanticVersion";

    let inputHandler = new InputHandler();

    try {
        const version: string = taskLibrary.getInput("version", true);
        const onExistingTag: string = taskLibrary.getInput("onExistingTag", true);
        const prefix: string = taskLibrary.getInput("prefix", true);
        const addTimestamp: boolean = taskLibrary.getBoolInput("addTimestamp", true);
        const setBuildNumber: boolean = taskLibrary.getBoolInput("setBuildNumber", true);

        let dateTime = new DateTime();
        let tagSetter = new TagSetter(dateTime, onExistingTag.toLowerCase(), addTimestamp);

        if (!inputHandler.isValidSemanticVersion(version)) throw `Provided version does not appear to be a valid semantic version according to the SemVer V2 spec: ${version}`;
        if (!inputHandler.isValidPrefix(prefix)) throw `Provided prefix is not valid for this task. The prefix may only contain alphanumerics and hyphens. Provided value is: ${prefix}`;
        
        let versionParts = inputHandler.splitVersionTag(version);
        let releaseVersion = versionParts[0];
        let existingTag = versionParts[1];
        let metadata = versionParts[2];

        let taggedVersion = tagSetter.getTaggedSemanticVersion(releaseVersion, existingTag, metadata, prefix);

        if (setBuildNumber) taskLibrary.updateBuildNumber(taggedVersion);
        taskLibrary.setVariable(variableName, taggedVersion);
    }
    catch (err) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, err.message);
    }
}

run();