// Import dependencies
import fs from "fs";
import { parse } from "csv-parse";

const res = [];
fs.createReadStream("data.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    const q = {
      question: row[1],
      answer: row[2],
      ...(row[3].length !== 0 && { answer2: row[3] }),
    };
    res.push(q);
  })
  .on("end", () => {
    //читаем второй файл
    const lines = fs.readFileSync("data.txt", "utf8").toString().split("\n");
    const questions = [];
    let temp = [];
    lines.forEach((line) => {
      if (line === "" && temp.length !== 0) {
        questions.push(temp);
        temp = [];
        return;
      }
      temp.push(line);
    });
    //to json objects
    questions.forEach((q) => {
      const que = {};
      q[0] && (que.quesion = q[0]);
      q[1] && (que.answer = q[1]);
      q[2] && (que.answer2 = q[2]);
      q[2] && console.log("answer2 exist");
      res.push(que);
    });

    fs.writeFileSync("out.json", JSON.stringify(res));
  });
