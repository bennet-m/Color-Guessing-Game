//creates the four incorrect colors and puts them on the buttons.
const guessOptions = () => {
  document.getElementById("button1").innerHTML = ""
  document.getElementById("button2").innerHTML = ""
  document.getElementById("button3").innerHTML = ""
  document.getElementById("button4").innerHTML = ""
  document.getElementById("button5").innerHTML = ""
  document.getElementById("button1").disabled = false;
  document.getElementById("button2").disabled = false;
  document.getElementById("button3").disabled = false;
  document.getElementById("button4").disabled = false;
  document.getElementById("button5").disabled = false;
  failed = false;
  color = randomColor();
  let optionsArray = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]]

  //sets one inner array value in optionsArray. i is the outer array index and j is the inner array index.
  const setRandColor = (i, j) => {

    let n = (Math.floor(Math.random() * 2) ) 
    if(n === 0) {
      optionsArray[i][j] = color[j] + Math.floor(Math.random() * 30 + 30) 
      if (optionsArray[i][j] > 255) {
        optionsArray[i][j] = 255
      }
    } else {
      optionsArray[i][j] = (color[j] - Math.floor(Math.random() * 30 + 30))
      if (optionsArray[i][j] < 0) {
        optionsArray[i][j] = 0
      }

    }
  }
  
  while (Math.abs(optionsArray[0][0] - optionsArray[1][0]) + Math.abs(optionsArray[0][1] - optionsArray[1][1]) + Math.abs(optionsArray[0][2] - optionsArray[1][2]) <= 90 || Math.abs(optionsArray[2][0] - optionsArray[1][0]) + Math.abs(optionsArray[2][1] - optionsArray[1][1]) + Math.abs(optionsArray[2][2] - optionsArray[1][2]) <= 90 || Math.abs(optionsArray[0][0] - optionsArray[2][0]) + Math.abs(optionsArray[0][1] - optionsArray[2][1]) + Math.abs(optionsArray[0][2] - optionsArray[2][2]) <= 90 || Math.abs(optionsArray[3][0] - optionsArray[2][0]) + Math.abs(optionsArray[3][1] - optionsArray[2][1]) + Math.abs(optionsArray[3][2] - optionsArray[2][2]) <= 90 || Math.abs(optionsArray[3][0] - optionsArray[0][0]) + Math.abs(optionsArray[3][1] - optionsArray[0][1]) + Math.abs(optionsArray[3][2] - optionsArray[0][2]) <= 90 || Math.abs(optionsArray[3][0] - optionsArray[1][0]) + Math.abs(optionsArray[3][1] - optionsArray[1][1]) + Math.abs(optionsArray[3][2] - optionsArray[1][2]) <= 90) {
    for (i=0; i < 4; i++) {
      for (j = 0; j < 3; j++) {
        setRandColor(i,j);
      }
    }
  }
  
  colorOption1 = (optionsArray[0].toString())
  colorOption2 = (optionsArray[1].toString())
  colorOption3 = (optionsArray[2].toString())
  colorOption4 = (optionsArray[3].toString())

  let one = 0
  let two= 0
  let three= 0
  let four= 0
  let five= 0

  //sets random button to the color given
  function setButton(colorOption) {
    let d =  1+ (Math.floor(Math.random() *5))
    let result;
    if (d === 1 && one === 0) {
      one = 1
      result = (`rgb(${colorOption})`) 
    } else if (d === 2 && two === 0) {
      two = 1
      result = (`rgb(${colorOption})`) 
    } else if (d === 3 && three === 0) {
      three = 1
      document.getElementById("restart").style.border = `4px solid rgb(${colorOption})`
      result = (`rgb(${colorOption})`) 
    }else if (d === 4 && four === 0) {
      four = 1
      result = (`rgb(${colorOption})`) 
    }else if (d === 5 && five === 0) {
      five = 1
      result = (`rgb(${colorOption})`) 
    } else {
      setButton(colorOption)
    }
    document.getElementById("button" + d.toString()).style.backgroundColor = result;
  }
 
  setButton(displayColor)
  setButton(colorOption1)
  setButton(colorOption2)
  setButton(colorOption3)
  setButton(colorOption4)
}

function randomColor() {
  let color= ["r","g","b"]
  for (i=0; i < color.length;i++) {
  color[i] = Math.floor(Math.random()*255)
  }
  
  displayColor = `${color[0]}, ${color[1]}, ${color[2]}`
  document.getElementById("color").innerHTML = "RGB value: " + displayColor
  return color
}

let streak = 0;
//Does everything that happens when a user makes a guess. Places inverted colored text on button and tracks and updates streak.
function userGuess(buttonClicked) {
  let numsOnly = buttonClicked.style.backgroundColor.substring(4,buttonClicked.style.backgroundColor.length - 1)
  numsOnly = numsOnly.replaceAll(" ", "").split(",")
  buttonClicked.disabled = true;

  let invertedValues = [0,0,0]
   invertedValues[0] = 255- Number (numsOnly[0])
   invertedValues[1] = 255- Number (numsOnly[1])
   invertedValues[2] = 255- Number (numsOnly[2])
  invertedValues = invertedValues.toString()
  buttonClicked.style.color = `rgb(${invertedValues.toString()})`

  if (document.getElementById(buttonClicked.id).style.backgroundColor === `rgb(${displayColor})`) {
    document.getElementById(buttonClicked.id).innerHTML = "<h4>You did it!!</h4>"
    if (!failed) {
      streak++;
    }
    document.getElementById("scoreKeep").innerHTML = `Streak: ${streak}`
  } else {
    document.getElementById(buttonClicked.id).innerHTML = "<h4>Try again</h4>"
    streak = 0;
    failed = true;
    document.getElementById("scoreKeep").innerHTML = `Streak: ${streak}`
  }
}

guessOptions()
