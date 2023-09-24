# Contributing to the KUASA Website Project

Welcome to the Kenyatta University Aerospace Engineering Students Association [(KUASA)](https://kuasa.live) website project! We appreciate your interest in contributing to our project. This guide will help you get started with the contribution process.

## Requirements

To contribute effectively to the KUASA website project, you should meet the following requirements:

- **Version Control**: You should be familiar with version control systems, particularly Git and GitHub.

- **Frontend Technologies**:

  - HTML, CSS: Proficiency in HTML and CSS for web development.
  - JavaScript: Knowledge of JavaScript for frontend interactivity.
  - Tailwind CSS: Familiarity with the Tailwind CSS framework for styling.

- **ReactJS**: Experience with ReactJS, as the project is built using React with Vite.

- **Similar Project Experience**: Having worked on a similar project before will be beneficial, but it's not mandatory.

## Getting Started

1. **Fork the Repository**:

   - Click the "Fork" button at the top right of the [KUASA GitHub repository](https://github.com/kuasakenya/kuasa-front).

2. **Clone Your Fork**:

   - Clone the forked repository to your local machine using the following command:
     ```
     git clone https://github.com/your-username/kuasa-front.git
     ```

3. **Create and Configure .env File**:

   - Create a `.env` file in the project root directory:

     ```
     touch .env
     ```

   - Edit the `.env` file and add the following line with the appropriate API URL:

     ```
     VITE_REACT_APP_KUASA_API=https://127.0.0.1:8000
     ```

4. **Install Dependencies**:

   - Navigate to the project directory and install the required dependencies:
     ```
     cd kuasa-front
     npm install
     ```

5. **Run the Project**:

   - Start the development server to run the project:
     ```
     npm run dev
     ```
     The website should now be accessible in your web browser.

6. **Create a Branch**:

   - Create a new branch for your contribution:
     ```
     git checkout -b feature/your-feature-name
     ```

7. **Make Changes**:

   - Make your desired changes or additions to the codebase.

8. **Linting and Formatting**:

   - Before committing your changes, make sure to fix linting errors and format the code:
     ```
     eslint .
     npx prettier --write .
     ```

9. **Commit Your Changes**:

   - Commit your changes with a clear and descriptive commit message:
     ```
     git commit -m "Add feature: your feature description"
     ```

10. **Push to Your Fork**:

   - Push your changes to your GitHub fork:
     ```
     git push origin feature/your-feature-name
     ```

11. **Open a Pull Request**:

    - Go to the [KUASA GitHub repository](https://github.com/kuasakenya/kuasa-front) and click the "New Pull Request" button.
    - Select the base branch (usually "main" or "master") and your feature branch.
    - Write a detailed description of your changes in the pull request.

12. **Review and Collaborate**:

    - Participate in the discussion and address any feedback or questions related to your pull request.

13. **Merge**:
    - Once your pull request is approved, it will be merged into the main project.

## Setting up the Backend (Optional)

If you wish to contribute to the backend as well, you can set up the Django RestFramework [backend repository](https://github.com/kuasakenya/kuasa-dj). Note that frontend contributors do not need to know the backend.

1. **Fork the Backend Repository**:

   - Click the "Fork" button at the top right of the [KUASA Backend GitHub repository](https://github.com/kuasakenya/kuasa-dj).

2. **Clone Your Fork**:

   - Clone the forked backend repository to your local machine using the following command:
     ```
     git clone https://github.com/your-username/kuasa-dj.git
     ```

3. **Install Dependencies**:

   - Navigate to the backend project directory and set up a virtual environment (recommended).
   - Install the required Python packages:
     ```
     pip install -r requirements.txt
     ```

4. **Run Migrations**:

   - Apply database migrations:
     ```
     python3 manage.py migrate
     ```

5. **Start the Development Server**:
   - Launch the Django development server:
     ```
     python3 manage.py runserver
     ```

For more check out this [contributing](https://github.com/kuasakenya/kuasa-dj/blob/main/CONTRIBUTING.md) guidelines. Keep in mind that frontend and backend contributions can be done independently.

## Code of Conduct

We expect all contributors to follow our code of conduct when participating in our project:

- Be respectful and considerate of others' ideas and opinions.
- Avoid offensive, discriminatory, or harmful behavior.
- Keep discussions and comments on-topic and constructive.
- If you encounter any issues or conflicts, report them to the project maintainers.

## Contribution Guidelines

- Contributions can include bug fixes, new features, documentation improvements, or any other valuable contributions.
- Make sure your code is well-documented, follows best practices, and adheres to the project's coding standards.
- Ensure that your commits have clear and descriptive messages.
- Keep pull requests small and focused on a single issue or feature to ease the review process.
- Test your changes thoroughly and ensure they do not introduce new bugs.

## Code Style and Guidelines

- We follow [eslint](https://eslint.org/) and [prettier](https://prettier.io/) for code formatting. Make sure your code complies with these standards.
- Document your code using comments and provide clear explanations in your pull request descriptions.

## Project Structure

Understanding the project's structure is essential before making contributions. Below is a high-level overview of the project's organization:

- **src**: This directory serves as the core of the KUASA website's source code.
  - **components**: Contains React components used to build the user interface (UI) of the website.
  - **pages**: Houses React components responsible for individual web pages.
  - **constants**: Stores static data and constants that are utilized within the project.
  - **contexts**: Houses React contexts, with a note that we may transition to using Redux in the future.
  - **...other directories**: Additional directories may contain project-specific files and folders related to specific features or functionalities.
- **utils**: This directory contains utility functions and helper code used throughout the project.

Understanding this structure will assist you in navigating the project and locating specific components or resources effectively.

## Feedback and Support

If you have any questions, feedback, or need assistance, feel free to open an issue in the GitHub repository or reach out to the project maintainers through our official communication channels.

Thank you for considering contributing to the KUASA website project. Your contributions are greatly appreciated, and together, we can make our website a valuable resource for our school club and community.
