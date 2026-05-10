function calculateResult() {
    let english = Number(document.getElementById("english").value);
    let math = Number(document.getElementById("math").value);
    let science = Number(document.getElementById("science").value);
    let social = Number(document.getElementById("social").value);
    let nepali = Number(document.getElementById("nepali").value);
    let computer = Number(document.getElementById("computer").value);
    let account = Number(document.getElementById("account").value);
    let optional = Number(document.getElementById("optional").value);

    let totalMarks = english + math + science + social + nepali + computer + account + optional;

    document.getElementById("total").innerHTML = "Total Marks: " + totalMarks;

    let resultText = "";
    let color = "";

    if (totalMarks > 700) {
        resultText = "Distinction";
        color = "green";
    }
    else if (totalMarks > 600) {
        resultText = "First Division";
        color = "blue";
    }
    else if (totalMarks >= 500) {
        resultText = "Second Division";
        color = "orange";
    }
    else if (totalMarks >= 400) {
        resultText = "Third Division";
        color = "purple";
    }
    else {
        resultText = "Fail";
        color = "red";
    }

    document.getElementById("result").innerHTML = resultText;
    document.getElementById("result").style.color = color;
}