const roll = (max, mod) => { 
  return (1 + Math.floor(Math.random() * max)) + mod
}

$(document).ready(() => { 
  $("form").submit(function( event ) {
    event.preventDefault();
  });
  const submit = $("input[type=submit]")
  submit.click(() => { 
    $("#resultText").css("color", "")
    $("#advantageText").remove()
    const amountOfDice = parseInt($("#amount").val())
    const typeOfDie = parseInt($("#type").val())
    const modifier = parseInt($("#mod").val()) || 0
    const isAdvantage = $("#advantage").val() === 'yes'
    const result = $("#resultText")
    result.text("")

    if (isAdvantage) { 
      const clone = result.clone()
      clone.text("")
      clone.attr('id', 'advantageText')
      $("#results").append(clone)
      $("#resultText").css("color", "red")
    }
    const advantageText = $("#advantageText")

    const modifyDOMAdvantage = (r1, r2, isLast) => { 
      r1 = roll(typeOfDie, modifier)
      r2 = roll(typeOfDie, modifier)
      if (r2 > r1) { 
        advantageText.text(`${advantageText.text()} ${r2} \t|\t`)
      } else { 
        advantageText.text(`${advantageText.text()} ${r1} \t|\t`)
        r1 = r2
      }
      result.text(`${result.text()}${r1} \t|\t`)
      if(isLast) { 
        const text = result.text()
        result.text(text.substring(0,text.length-4))
        
        const advText = advantageText.text()
        advantageText.text(advText.substring(0,advText.length-4))
      }
    }
    for (let i = 1; i < amountOfDice; i++) { 
      let rollValue = roll(typeOfDie, modifier)
      if (isAdvantage) { 
        modifyDOMAdvantage(rollValue, roll(typeOfDie, modifier), false)
      } else { 
        result.text(`${result.text()}${rollValue} \t|\t`)
      }
    }
    if (isAdvantage) { 
      modifyDOMAdvantage(roll(typeOfDie, modifier), roll(typeOfDie, modifier), true)
    } else { 
    result.text(`${result.text()}  ${roll(typeOfDie, modifier)}`)
    }

  })
})
