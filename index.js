const inquirer = require("inquirer");
const fs = require("fs");
const { Triangle, Circle, Square } = require("./shapes");

function generateLogo() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "text",
        message: "Enter up to 5 characters for your logo :",
        validate: function (input) {
          return input.length <= 5 ? true : "Enter up to 5 characters.";
        },
      },
      {
        type: "input",
        name: "textColor",
        message: "Choose your text color (either a keyword or a hex number):",
      },
      {
        type: "list",
        name: "shape",
        message: "Choose the shape of your logo:",
        choices: ["Triangle", "Circle", "Square"],
      },
      {
        type: "input",
        name: "shapeColor",
        message: "Choose your shape color (either a keyword or a hex number)ommi:",
      },
    ])
    .then((answers) => {
      const { text, textColor, shape, shapeColor } = answers;

      let selectedShape;
      switch (shape) {
        case "Triangle":
          selectedShape = new Triangle();
          break;
        case "Circle":
          selectedShape = new Circle();
          break;
        case "Square":
          selectedShape = new Square();
          break;
      }

      selectedShape.setColor(shapeColor);

      const svgString = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        ${selectedShape.render()}
        <text x="150" y="150" fill="${textColor}" text-anchor="middle" font-size="40">${text}</text>
      </svg>`;

      fs.writeFile("logo.svg", svgString, (err) => {
        if (err) throw err;
        console.log("Generated logo.svg");
      });
    });
}

generateLogo();
