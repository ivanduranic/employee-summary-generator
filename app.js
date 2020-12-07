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
const idArray = [];

function appSet() {

  function makeManager() {
    console.log("Assemble your team, please.");
    inquirer.prompt([
      {
        type: "input",
        name: "managerName",
        message: "Please enter your manager's name.",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      },
      {
        type: "input",
        name: "managerId",
        message: "Please enter your manager's id.",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "Please enter a positive number greater than zero.";
        }
      },
      {
        type: "input",
        name: "managerEmail",
        message: "Please enter your manager's email.",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "Please enter your manager's office number.",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "Please enter a positive number greater than zero.";
        }
      }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
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
        message: "Please enter your engineer's name.",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      },
      {
        type: "input",
        name: "engineerId",
        message: "Please enter your engineer's id.",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (idArray.includes(answer)) {
              return "This ID is already taken. Please enter a different number.";
            } else {
              return true;
            }
                        
          }
          return "Please enter a positive number greater than zero.";
        }
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "Please enter your engineer's email.",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "Please enter your engineer's GitHub username.",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      }
    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamMembers.push(engineer);
      idArray.push(answers.engineerId);
      makeTeam();
    });
  }

  function attachIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "Please enter your intern's name.",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      },
      {
        type: "input",
        name: "internId",
        message: "Please enter your intern's id.",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (idArray.includes(answer)) {
              return "This ID is already taken. Please enter a different number.";
            } else {
              return true;
            }
                        
          }
          return "Please enter a positive number greater than zero.";
        }
      },
      {
        type: "input",
        name: "internEmail",
        message: "Please enter your intern's email.",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "internSchool",
        message: "Please enter your intern's school.",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      }
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      idArray.push(answers.internId);
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