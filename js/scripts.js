var vowels = ["a","e","i","o","u"]
var resultArray = []
$(function(){
  $("button").click(function(){
    event.preventDefault()
    var wordArray = $("input").val().split(" ")
    wordArray.forEach(function(word){
      resultArray.push(convert(word))
    })
    displayResults()
  })
})
function displayResults() {
  $("#result").html("")
  resultArray.forEach(function(word,i){
    $('#result').append(resultArray[i] + " ")
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
  if (isVowel(firstLetter) && !qException) {
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
