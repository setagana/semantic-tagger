// TODO: Replace the text below with a user guide for your extension.

# Semantic Tagger

This repository forms a reusable template for the development of Azure Devops extensions.

# Requirements

* [Visual Studio Code](https://code.visualstudio.com/download)
* [Todo Tree](https://github.com/Gruntfuggly/todo-tree)
* [Docker](https://hub.docker.com/?overlay=onboarding)

The template is intended for use with Visual Studio Code and the brilliant [Todo Tree](https://github.com/Gruntfuggly/todo-tree). Simply open the Todo Tree extension and you'll get a full list of things to update to build your extension.

## Testing your application

A Docker image is available for running your automated tests (which you are writing, right?)

In Visual Studio Code open a new Terminal (default hotkey is `Ctrl+Shift+\``) and enter the following command:

`docker build --rm -f "Test.Dockerfile" -t tfx-extension-template:test .`

For manual testing, use the steps below to package the extension and then test it with your Azure Devops organization / server.

## Packaging your application

In Visual Studio Code open a new Terminal (default hotkey is `Ctrl+Shift+\``) and enter the following command:

// TODO: Add packaging docker build command