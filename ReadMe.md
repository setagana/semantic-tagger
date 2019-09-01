# Semantic Tagger
A custom build task for Azure Devops that adds a pre-release tag to any semantic version.

## Ideal in combination with .NET Core Version Extractor
This task was designed to be used together with the [.NET Core Version Extractor](https://marketplace.visualstudio.com/items?itemName=MatthewdeBeer.net-core-version-extractor). Pair the two together and you can make a powerful CI/CD pipeline which allows your developers to set the semantic tag in their .csproj files, and then rev their changes without worrying about version collisions.

## Reading the data
Once tagged, the version will available for use further on in your pipeline via the `$(TaggedSemanticVersion)` build variable.

Icons made by [Flat Icons](https://www.flaticon.com/authors/flat-icons) from [www.flaticon.com](https://www.flaticon.com/).