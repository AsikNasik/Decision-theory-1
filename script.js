let classNameSections = document.querySelector(".name_sections");
let btnCountinue = document.getElementById("continue");
let btnAddDescribe = document.getElementById("addDescribe");
let btnChooseAlternative = document.getElementById("choose_alternative");
let btnResult = document.getElementById("result");
let btnAddName = document.getElementById("addName");
let classNumberCriterions = document.getElementsByClassName(
  "number_criterions"
);
let classDescribeSection = document.getElementsByClassName("describe_section");
let classCriterionDescription = document.getElementsByClassName(
  "criterion_description"
);
let classResult = document.getElementsByClassName("result");
let classSelectCriterion = document.getElementsByClassName("select_criterion");
let tableSpace = document.getElementsByClassName("tableSpace");

let numberCriterion = 0;

btnCountinue.onclick = function() {
  numberCriterion = document.getElementById("number_criterion").value;
  if (!numberCriterion) {
    return false;
  }

  classNumberCriterions[0].style.display = "none";
  classNameSections.style.display = "inline";

  let criterionsHtml = "<p>Name of criterions:</p>";
  for (let i = 0; i < numberCriterion; i++) {
    criterionsHtml =
      criterionsHtml +
      '<div class="criterion_describe"><input class="inputs" id="name_criterion' +
      i +
      '">' +
      '<button class="buttonsDescribe" id="describe' +
      i +
      '" data-id="' +
      i +
      '">Describe</button>' +
      "</div>";
  }
  criterionsHtml =
    criterionsHtml +
    '<br><button id="saveNames">Save</button>' +
    '<button id="choose_alternative">Choose alternative</button>';
  classNameSections.innerHTML = criterionsHtml;

  for (let i = 0; i < numberCriterion; i++) {
    $("#describe" + i).on("click", addEventToButtonDescribe);
  }
};

function addEventToButtonDescribe(e) {
  classNameSections.style.display = "none";
  classDescribeSection[0].style.display = "inline";

  let descriptionsHtml =
    "<p>Describe a criterion:</p>" +
    '<input class="criterion_description" data-order="0">' +
    '<input class="criterion_description" data-order="1"> ' +
    '<br><button id="saveDescriptions">Save</button>' +
    '<button id="addDescribe">Add description</button>' +
    '<button id="deleteDescribe">Delete last</button>' +
    '<button id="addName">All criterions</button>';

  classDescribeSection[0].innerHTML = descriptionsHtml;
}

let idBtnDescribe;
$("body").on("click", ".buttonsDescribe", function() {
  idBtnDescribe = $(this).attr("id");
});

let arrayValueInput;
$("body").on("click", "#saveNames", function() {
  arrayValueInput = new Array();

  for (let i = 0; i < numberCriterion; i++) {
    let val = document.getElementById("name_criterion" + i).value;
    arrayValueInput[i] = val;
  }
});

let arrayValueDescriptions;
let arrayValueAllDescriptions = new Array();
$("body").on("click", "#saveDescriptions", function() {
  let numberSoleDescription = document.getElementsByClassName(
    "criterion_description"
  );
  let numInputsDesc = idBtnDescribe[idBtnDescribe.length - 1];

  arrayValueDescriptions = new Array();
  arrayValueAllDescriptions[numInputsDesc] = new Array();

  for (let i = 0; i < numberSoleDescription.length; i++) {
    arrayValueDescriptions.push(numberSoleDescription[i].value);
    arrayValueAllDescriptions[numInputsDesc][i] = arrayValueDescriptions[i];
  }
});

let numberInputsDesc;
$("body").on("click", "#addDescribe", function() {
  let numberInputsDesc = document.getElementsByClassName(
    "criterion_description"
  ).length;
  if (numberInputsDesc < 5) {
    let lastInput = $(".describe_section .criterion_description").last();
    lastInput.after('<input class="criterion_description"> ');
    numberInputsDesc++;
  }
});

let numInputsDesc = classCriterionDescription.length;
$("body").on("click", "#deleteDescribe", function() {
  let numberInputsDesc = document.getElementsByClassName(
    "criterion_description"
  ).length;
  if (numberInputsDesc > 2) {
    let deleteDescribe =
      classCriterionDescription[classCriterionDescription.length - 1];
    deleteDescribe.parentNode.removeChild(deleteDescribe);
    numInputsDesc--;
    numberInputsDesc--;
  }
});

$("body").on("click", "#addName", function() {
  classDescribeSection[0].style.display = "none";
  classNameSections.style.display = "inline";
});

let countAllDescriptions = 1;
let arrTable = new Array();
$("body").on("click", "#choose_alternative", function() {
  classSelectCriterion[0].style.display = "inline";
  classNameSections.style.display = "none";

  let selectCriterion = "Choose criterions: <br>";
  let index = 0;
  for (let i = 0; i < arrayValueAllDescriptions.length; i++) {
    selectCriterion =
      selectCriterion +
      "<p>" +
      arrayValueInput[index] +
      ": </p>" +
      '<select class="selection">';
    for (let j = 0; j < arrayValueAllDescriptions[i].length; j++) {
      selectCriterion =
        selectCriterion +
        '<option class="select_criterions" value="' +
        arrayValueAllDescriptions[i][j] +
        '">' +
        arrayValueAllDescriptions[i][j] +
        "</option>";
    }
    selectCriterion = selectCriterion + "</select>";
    index++;
  }

  selectCriterion =
    selectCriterion +
    '<br><br><button id="result">Result</button>' +
    '<div class="tableSpace"></div>';

  classSelectCriterion[0].innerHTML = selectCriterion;

  let tableAlternatives = '<table id="table_alternative">' + "<tboby><tr>";

  for (let i = 0; i < arrayValueAllDescriptions.length; i++) {
    countAllDescriptions *= arrayValueAllDescriptions[i].length;
  }

  arrTable.length = arrayValueAllDescriptions.length;
  for (let i = 0; i < arrTable.length; i++) {
    let tr = [];
    tr.length = countAllDescriptions;
    arrTable[i] = tr;
  }

  let totalLength = countAllDescriptions;
  arrTable = func(
    arrayValueAllDescriptions,
    arrTable,
    countAllDescriptions,
    totalLength
  );

  for (let i = 0; i < numberCriterion; i++) {
    tableAlternatives =
      tableAlternatives + "<th>" + arrayValueInput[i] + "</th>";
  }
  tableAlternatives = tableAlternatives + "</tr>";

  tableAlternatives =
    tableAlternatives + "</tbody></table><p class='result'></p>";
  tableSpace[0].innerHTML = tableAlternatives;

  let tbody = document
    .getElementById("table_alternative")
    .getElementsByTagName("tbody")[0];

  for (let i = 0; i < countAllDescriptions; i++) {
    let row = document.createElement("TR");
    for (let j = 0; j < numberCriterion; j++) {
      let td0 = document.createElement("TD");
      td0.appendChild(document.createTextNode(arrTable[j][i]));
      tbody.appendChild(row);
      row.appendChild(td0);
    }
  }
});

function func(
  arrayValueAllDescriptions,
  arrTable,
  countAllDescriptions,
  totalLength
) {
  for (var k = 0; k < arrTable.length; k++) {
    totalLength /= arrayValueAllDescriptions[k].length;
    tr = arrTable[k];
    var index = 0;
    var j = 0;

    for (var i = 0; i < countAllDescriptions; i++) {
      tr[i] = String(k + 1) + (index + 1);
      if (j < totalLength - 1) {
        j++;
      } else {
        index++;
        if (index == arrayValueAllDescriptions[k].length) {
          index = 0;
        }
        j = 0;
      }
    }
  }
  return arrTable;
}

let choosenAlternatives;
let betterAlternatives;
let worseAlternatives;
let uncountAlternatives;
$("body").on("click", "#result", function() {
  betterAlternatives = new Array();
  worseAlternatives = new Array();
  uncountAlternatives = new Array();
  let arraySelections = new Array();
  let valuesSelections = document.getElementsByClassName("selection");

  for (let i = 0; i < valuesSelections.length; i++) {
    arraySelections.push(valuesSelections[i].value);
  }

  let tmpI = 0;
  let tmpJ = 0;
  let arrTmpIJ = new Array();
  for (let i = 0; i < arrayValueAllDescriptions.length; i++) {
    for (let j = 0; j < arrayValueAllDescriptions[i].length; j++) {
      if (arraySelections[i] === arrayValueAllDescriptions[i][j]) {
        tmpI = i;
        tmpJ = j;
        arrTmpIJ.push(String(i + 1) + (j + 1));
      }
    }
  }

  let arrTmpTrueFalseBetter = new Array();
  for (let i = 0; i < arrTable.length; i++) {
    arrTmpTrueFalseBetter[i] = new Array();
    for (let j = 0; j < arrTable[i].length; j++) {
      if (arrTable[i][j] <= arrTmpIJ[i]) {
        arrTmpTrueFalseBetter[i].push(1);
      } else {
        arrTmpTrueFalseBetter[i].push(0);
      }
    }
  }

  let arrTmpTrueFalseWorse = new Array();
  for (let i = 0; i < arrTable.length; i++) {
    arrTmpTrueFalseWorse[i] = new Array();
    for (let j = 0; j < arrTable[i].length; j++) {
      if (arrTable[i][j] >= arrTmpIJ[i]) {
        arrTmpTrueFalseWorse[i].push(0);
      } else {
        arrTmpTrueFalseWorse[i].push(1);
      }
    }
  }

  let arrTmpTrueValues = new Array();
  let arrTmpFalseValues = new Array();
  let arrTmpNoneValues = new Array();
  for (let i = 0; i < arrTmpTrueFalseBetter[0].length; i++) {
    let checkValue = 1;
    for (let j = 0; j < arrTmpTrueFalseBetter.length - 1; j++) {
      if (
        arrTmpTrueFalseBetter[j][i] === arrTmpTrueFalseBetter[j + 1][i] &&
        (arrTmpTrueFalseBetter[j][i] === 1 ||
          arrTmpTrueFalseBetter[j + 1][i] === 1)
      ) {
        checkValue = 2;
      } else {
        checkValue = 3;
        break;
      }
    }
    if (checkValue === 2) {
      arrTmpTrueValues.push(i);
    } else if (checkValue === 3) {
      arrTmpNoneValues.push(i);
    }
  }

  for (let i = 0; i < arrTmpTrueFalseWorse[0].length; i++) {
    let checkValue = 1;
    for (let j = 0; j < arrTmpTrueFalseWorse.length - 1; j++) {
      if (
        arrTmpTrueFalseWorse[j][i] === arrTmpTrueFalseWorse[j + 1][i] &&
        (arrTmpTrueFalseWorse[j][i] === 0 ||
          arrTmpTrueFalseWorse[j + 1][i] === 0)
      ) {
        checkValue = 2;
      } else {
        checkValue = 3;
        break;
      }
    }
    if (checkValue === 2) {
      arrTmpFalseValues.push(i);
    } else if (checkValue === 3) {
      arrTmpNoneValues.push(i);
    }
  }

  let htmlAlternatives = "<p>The best alternatives: ";
  for (let i = 0; i < arrTmpTrueValues.length - 1; i++) {
    betterAlternatives[i] = new Array();
    for (let j = 0; j < arrTable.length; j++) {
      betterAlternatives[i].push(arrTable[j][arrTmpTrueValues[i]]);
    }
    htmlAlternatives += betterAlternatives[i].concat() + "; ";
  }

  htmlAlternatives += "</p>";
  htmlAlternatives += "<p>The worse alternatives: ";
  for (let i = 1; i < arrTmpFalseValues.length; i++) {
    worseAlternatives[i] = new Array();
    for (let j = 0; j < arrTable.length; j++) {
      worseAlternatives[i].push(arrTable[j][arrTmpFalseValues[i]]);
    }
    htmlAlternatives += worseAlternatives[i].concat() + "; ";
  }

  htmlAlternatives += "</p>";
  htmlAlternatives += "<p>The uncount alternatives: ";
  for (let i = 0; i < arrTmpNoneValues.length; i++) {
    uncountAlternatives[i] = new Array();
    let tmpCounter = countRepeatElements(arrTmpNoneValues, arrTmpNoneValues[i]);
    for (let j = 0; j < arrTable.length; j++) {
      if(tmpCounter === 2) // 2 due to the best and worse (2)
      {
        uncountAlternatives[i].push(arrTable[j][arrTmpNoneValues[i]]);
      }
      else break;
    }
  }

  uniqueArray = uniqBy(uncountAlternatives, JSON.stringify);

  for (let i = 0; i < uniqueArray.length; i++) {
    htmlAlternatives += uniqueArray[i].concat();
    htmlAlternatives += "; ";
  }

  classResult[0].innerHTML = htmlAlternatives;
});

function uniqBy(uncountAlternatives, key) {
  var index = [];
  return uncountAlternatives.filter(function(item) {
    var k = key(item);
    return index.indexOf(k) >= 0 ? false : index.push(k);
  });
}

function countRepeatElements(arrUncountAlternatives, value) {
  let count = 0;
  for (let i = 0; i < arrUncountAlternatives.length; i++) {
    if (value === arrUncountAlternatives[i]) {
      count++;
      if (count === 2) {
        break;
      }
    }
  }
  return count;
}