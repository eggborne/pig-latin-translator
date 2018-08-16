var vowels = ["a","e","i","o","u","y"]
var resultArray = []
var hyphenatedPhrases = []
$(function(){
  $("button").click(function(){
    event.preventDefault()
    var wordArray = $("input").val().split(" ")

    wordArray.forEach(function(word){
      if (word.includes("-")) {
        console.log(word + " has a hyphen")
        hyphenatedSplitWord = word.split("-")
        console.log("new array:")
        console.log(hyphenatedSplitWord)
        var indexArray = []
        for (i=0; i<hyphenatedSplitWord.length; i++) {

          var segment = hyphenatedSplitWord[i]
          console.log(segment)
          resultArray.push(convert(segment))
          var newIndex = resultArray.length-1
          console.log(newIndex)
          indexArray.push(newIndex)
          console.log("ind arr")
          console.log(indexArray)
        }
        hyphenatedPhrases.push(indexArray)
      } else {
        resultArray.push(convert(word))
      }
      console.log(hyphenatedPhrases)
    })
    console.log(resultArray)
    displayResults()
  })
})
function displayResults() {

  $("#result").html("")
  resultArray.forEach(function(word,i){
    var toAppend = resultArray[i] + " "
    hyphenatedPhrases.forEach(function(indexArray){
      if (indexArray[0]===i) {
        console.log(word + " was hyphenated!!")
        console.log(resultArray[indexArray[0]] + " and " + resultArray[indexArray[1]])
        toAppend = resultArray[indexArray[0]] + "-" + resultArray[indexArray[1]] + " "
      }
    })
    $("#result").append(toAppend)
    // $("#result").append(toAppend)
  })
  resultArray = []
}

function convert(word) {
  var firstConsonants = findConsecutiveConsonants(word)
  var result = word.substr(firstConsonants.length,word.length)
  var firstLetter = word[0]
  var qException = false
  console.log(word)
  if (firstConsonants.includes("q")) {
    if (isVowel(firstConsonants[0])) {
      firstConsonants = firstConsonants.substr(1,firstConsonants.length)
      console.log("cut off " + firstConsonants[0])
    }
    qException = true;
    console.log("first cons include a Q")
    var qPosition = firstConsonants.indexOf("q")
    if (qPosition === firstConsonants.length-1) {
      console.log("Q is at end if first consonants")
      var afterQ = word.indexOf(firstConsonants[firstConsonants.length]==="u")
      if (afterQ) {
        console.log("there's a U after the end of firstConsonants")
        firstConsonants += "u"
        result = result.substr(1,result.length)
        console.log("removing U from result, now result is " + result)
      }
    }
  }
  if (isVowel(firstLetter) && (!qException || firstLetter==="y")) {
    // first letter a vowel
    result += "way"
  } else {
    // first letter a consonant
    console.log("first cons " + firstConsonants)
    result += firstConsonants
    result += "ay"
  }
  console.log(result)
  return result
}
function findConsecutiveConsonants(word) {
  var result = ""
  for (var i=0; i<word.length; i++) {
    var letter = word[i]
    if (!isVowel(letter) || letter==="u" && word[i-1]==="q" || word[i+1]==="q"){
      result += letter
    } else if ((i+1) !== "q") {
      console.log(result)
      return result
    }
  }
}
function isVowel(letter) {
  return vowels.indexOf(letter) > -1
}
