# employee-summary-generator

## Description

This is a software engineering team generator command line application. The application prompts the user for information about the team manager and then information about the team members. The user can input any number of team members, and they may be a mix of engineers and interns. This app had passed all unit tests. When the user has completed building the team, the application creates an HTML file that displays a nicely formatted team roster based on the information provided by the user.

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

When you create a new repository in your GitHub account, first create a `.gitignore` file and include `node_modules/` so that your `node_modules` directory isn't tracked or uploaded to GitHub. Be sure to create your `.gitignore` file before installing any npm dependencies.

Secondly, make sure that your repo includes a `package.json` with the required dependencies. You can create one by running `npm init` when you first set up the project, before installing any dependencies.

Finally, run `npm install` in order to install the following npm package dependencies as specified in the `package.json`:
`inquirer` that will prompt you for your inputs from the command line,
`jest` that will help you run your test with the command `npm run test`.

The application itself can be invoked by running the command `node app.js`.

## Usage



When you run `node app.js` the application will prompt you, using the `inquirer` package, in the command line with a series of questions about your employees.

Application will then generate file `team.html` inside `output` folder, based on your responses to the inquirer prompts. 

## License

MIT License

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Questions

Find me on GitHub: github.com/ivanduranic

You can reach me with additional questions on: ivan.duranic@gmail.com

<br><br>

Respectfully,

Ivan Duranic
