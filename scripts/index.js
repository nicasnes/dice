const roll = (max) => { 
  return 1 + Math.floor(Math.random() * max)
}

$(document).ready(() => { 
  $("form").submit(function( event ) {
    event.preventDefault();
  });
  const submit = $("input[type=submit]")
  submit.click(() => { 
    const amountOfDice = parseInt($("#amount").val())
    const typeOfDie = parseInt($("#type").val())
    const modifier = parseInt($("#mod").val()) || 0
    const result = $("#resultText")
    result.text("")
    console.log(amountOfDice, typeOfDie, modifier)
    for (let i = 1; i < amountOfDice; i++) { 
      result.text(`${result.text()}  ${roll(typeOfDie) + modifier} \t|\t`)
    }
    result.text(`${result.text()}  ${roll(typeOfDie) + modifier}`)
  })
})
