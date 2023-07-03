#!/usr/bin/env node
// import files f:rom "./lib/files";

// const chalk = require("chalk");
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { getQuestions } from "./lib/inquirer.js";

clear();
greeting();
run();

function greeting() {
  console.log(
    chalk.green(figlet.textSync("Easymemo", { horizontalLayout: "full" }))
  );
}
async function run() {
  const data = await getQuestions();
  console.log(data);
}
