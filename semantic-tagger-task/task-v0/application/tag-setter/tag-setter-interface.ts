export interface TagSetterInterface {
    getTaggedSemanticVersion(releaseVersion: string, existingTag: string, metadata: string, prefix: string): string;
}