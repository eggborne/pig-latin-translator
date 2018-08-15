var vowels = ["a","e","i","o","u"]

$(function(){
  $("button").click(function(){
    event.preventDefault()
    convert($("input").val());
    
  })
})


function convert(word) {
  var result = word
  if (vowels.indexOf(word[0]) > -1) { // first letter a vowel
    result += "way"
  }
  console.log(result)
  return result
}
