# Contributing to PDF to Images Browser

Thank you for your interest in contributing to PDF to Images Browser! We're thrilled to have you on board. By contributing, you’re helping to make PDF to Images Browser better for everyone. Please take a moment to review this guide before getting started.

If you have any questions or need assistance, feel free to open an issue on GitHub.

## Table of Contents

- [About This Repository](#about-this-repository)
- [Repository Structure](#repository-structure)
- [Development](#development)
  - [Fork the Repository](#fork-the-repository)
  - [Clone the Repository](#clone-the-repository)
  - [Navigate to Project Directory](#navigate-to-project-directory)
  - [Create a New Branch](#create-a-new-branch)
  - [Install Dependencies](#install-dependencies)
  - [Building the Package](#building-the-package)
  - [Running in Development Mode](#running-in-development-mode)
- [Testing PDF to Images Browser Locally](#testing-pdf-to-images-browser-locally)
- [Documentation](#documentation)
- [Commit Conventions](#commit-conventions)
- [Requesting New Features or Components](#requesting-new-features-or-components)
- [Testing](#testing)
- [Final Steps](#final-steps)

## About This Repository

Here's a quick overview of the technologies we use:

- **[PNPM Workspaces](https://pnpm.io/workspaces):** For managing monorepos.
- **[Tsup](https://tsup.egoist.dev/):** A TypeScript bundler for building the project.
- **[Vitest](https://vitest.dev):** Our testing framework.

## Development

Follow these steps to set up your development environment and start contributing to PDF to Images Browser.

### Fork the Repository

1. Navigate to the [PDF to Images Browser GitHub repository](https://github.com/arshad-yaseen/pdf-to-images-browser).
2. Click the **Fork** button in the top-right corner to create a copy of the repository under your GitHub account.

### Clone the Repository

Clone your forked repository to your local machine using the following command:

```bash
git clone https://github.com/arshad-yaseen/pdf-to-images-browser.git
```

### Navigate to Project Directory

Move into the project directory:

```bash
cd pdf-to-images-browser
```

### Create a New Branch

Create a new branch for your work to keep changes organized:

```bash
git checkout -b my-new-feature
```

### Install Dependencies

PDF to Images Browser uses PNPM for managing dependencies. Install them by running:

```bash
pnpm install
```

### Building the Package

To build the package, execute the following command:

```bash
pnpm build
```

This command uses [Tsup](https://tsup.egoist.dev/) to bundle the project.

#### Alternative: Start Development Mode

For automatic rebuilds on file changes, start the watch mode with:

```bash
pnpm dev
```

This is useful for continuous development and testing.

## Testing PDF to Images Browser Locally

To test PDF to Images Browser locally, follow these steps:

1. **Run the Test UI**

   Execute the following command to start the testing environment:

   ```bash
   pnpm dev:test-ui
   ```

   This will launch the UI in a local development environment, allowing you to test changes in real-time.

## Documentation

Comprehensive documentation is essential.

- **Location:** The documentation is located within the `README.md` file at the root of the repository.
- **Format:** Documentation is written using Markdown.

### Viewing Documentation

To view the documentation, simply open the `README.md` file in your preferred text editor or view it directly on GitHub.

## Commit Conventions

Adhering to a consistent commit message format helps maintain a clear project history and facilitates collaboration.

**Commit Message Format:**

```plaintext
category(scope): message
```

**Categories:**

- `feat` / `feature`: Introduces new features or functionality.
- `fix`: Addresses and resolves bugs.
- `refactor`: Code changes that neither fix a bug nor add a feature.
- `docs`: Updates or additions to documentation.
- `build`: Changes related to the build process or dependencies.
- `test`: Adding or modifying tests.
- `ci`: Changes to continuous integration configurations.
- `chore`: Miscellaneous tasks that do not fit into the above categories.

**Examples:**

- `feat(completion): add new inline completion provider`
- `fix(core): resolve token handling issue in completion handler`
- `docs: update API usage guide for PDF to Images Browser`

For detailed guidelines, refer to the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Requesting New Features or Components

If you have ideas for new features or components, we’d love to hear them!

1. **Open an Issue:**

   - Navigate to the [Issues](https://github.com/arshad-yaseen/PDF to Images Browser/issues) section of the repository.
   - Click on **New Issue** and provide a clear and detailed description of your request.

## Testing

Ensuring that your contributions do not introduce regressions is crucial.

### Running Tests

PDF to Images Browser uses [Vitest](https://vitest.dev) for testing. To run all tests, execute:

```bash
pnpm test
```

### Writing Tests

When adding new features or components, include corresponding tests to maintain code quality.

### Ensuring Tests Pass

Before submitting a pull request, ensure all tests pass:

```bash
pnpm test
```

## Final Steps

1. **Commit Your Changes:**

   Ensure your commits follow the [Commit Conventions](#commit-conventions) outlined above.

2. **Push to Your Fork:**

   ```bash
   git push origin my-new-feature
   ```

3. **Create a Pull Request:**

   - Navigate to your forked repository on GitHub.
   - Click on **Compare & pull request**.
   - Provide a clear description of your changes and submit the pull request.

Thank you for contributing to PDF to Images Browser! Your efforts help make the project better for everyone.
