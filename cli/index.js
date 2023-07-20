#!/usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import inquirer from "inquirer";
import api from "./lib/api.js";

clear();
greeting();
await login();
run();

function greeting() {
  console.log(
    chalk.green(figlet.textSync("Easymemo", { horizontalLayout: "full" }))
  );
}

async function login() {
  const { email, password } = await inquirer.prompt([
    { name: "email", type: "input", message: "login: " },
    { name: "password", type: "password", message: "password: " },
  ]);
  if (email && password) {
    try {
      await api.login(email, password);
      console.log(chalk.green("Login access. Welcome " + email + "!"));
    } catch (e) {
      console.log(chalk.red("Error: ", e.message));
    }
  }
}

async function run() {
  const questionsNumber = await inquirer.prompt({
    name: "questionsNumber",
    type: "list",
    message: "select the number of questions:",
    choices: [10, 20, 50],
    default: 0,
  });
  const questions = await getQuestions(questionsNumber);
  const answersData = await inquirer.prompt(questions);
  console.log(answersData);
}

async function getQuestions(count = 20) {
  const { data: questions } = await api.getQuestions(count);
  return prepQuestions(questions);
}

function prepQuestions(questions) {
  const preparedQuestions = questions.map((i) => {
    return {
      name: i.question,
      type: "input",
      message: i.question + " :",
      validate: function (value) {
        if (value === i.answer) {
          return true;
        } else {
          return i.answer;
        }
      },
    };
  });
  return preparedQuestions;
}
