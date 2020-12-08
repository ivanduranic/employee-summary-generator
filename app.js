const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const answerArray = [];

function appSet() {

  function makeManager() {
    console.log("Assemble your team, please.");
    inquirer.prompt([
      {
        type: "input",
        name: "managerName",
        message: "Please enter your manager's name."
      },
      {
        type: "input",
        name: "managerId",
        message: "Please enter your manager's id."
      },
      {
        type: "input",
        name: "managerEmail",
        message: "Please enter your manager's email."
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "Please enter your manager's office number."
      }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      answerArray.push(answers.managerId);
      makeTeam();
    });
  }

  function makeTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Select a type of team member you would like to add.",
        choices: [
          "Engineer",
          "Intern",
          "No more team members to add."
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        attachEngineer();
        break;
      case "Intern":
        attachIntern();
        break;
      default:
        assembleTeam();
      }
    });
  }

  function attachEngineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "engineerName",
        message: "Please enter your engineer's name."
      },
      {
        type: "input",
        name: "engineerId",
        message: "Please enter your engineer's id."
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "Please enter your engineer's email."
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "Please enter your engineer's GitHub username."
      }
    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamMembers.push(engineer);
      answerArray.push(answers.engineerId);
      makeTeam();
    });
  }

  function attachIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "Please enter your intern's name."
      },
      {
        type: "input",
        name: "internId",
        message: "Please enter your intern's id."
      },
      {
        type: "input",
        name: "internEmail",
        message: "Please enter your intern's email.",
      },
      {
        type: "input",
        name: "internSchool",
        message: "Please enter your intern's school."
      }
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      answerArray.push(answers.internId);
      makeTeam();
    });
  }

  function assembleTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  makeManager();

}


appSet();