export interface InputHandlerInterface {
    isValidSemanticVersion(version: string): boolean;
    isValidPrefix(prefix: string): boolean;
    splitVersionTag(version: string): [string, string, string];
}