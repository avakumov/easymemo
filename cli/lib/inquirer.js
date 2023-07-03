import inquirer from "inquirer";

const questions = [
  { q: "Which node support modules to 13 version", a: "ESmodules" },
];
const preparedQuestions = questions.map((i) => {
  return {
    name: "answer",
    type: "input",
    message: i.q + " :",
    validate: function (value) {
      if (value === i.a) {
        return true;
      } else {
        return i.a;
      }
    },
  };
});
export async function getQuestions() {
  return inquirer.prompt(preparedQuestions);
}
