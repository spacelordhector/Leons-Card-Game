//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)


let deckId = ""//Gets the Deck ID
function getDeckId() {
  fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (localStorage.getItem('Deck-ID') == null) {
        deckId = data.deck_id
        localStorage.setItem('Deck-ID', deckId)
      } else {
        deckId = localStorage.getItem('Deck-ID')
      }
      console.log(deckId)
    })
    .catch(error => console.log(error))
}
getDeckId()



function getFetch() { //Uses the previous function to get the deck

  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      document.querySelector('#player1-image').src = data.cards[0].image //Inserts images to the DOM
      document.querySelector('#player2-image').src = data.cards[1].image
      data.cards.forEach(card => { //Loops through the two cards to determine their numeric value
        if (card.value === 'ACE') {
          card.value = 14
        } else if (card.value === 'KING') {
          card.value = 13
        } else if (card.value === 'QUEEN') {
          card.value = 12
        } else if (card.value === 'JACK') {
          card.value = 11
        } else {
          card.value = Number(card.value)
        }
        console.log(card.value)
      })
      if (data.cards[0].value < data.cards[1].value) { // Determines which player wins
        document.querySelector('#results').innerText = 'Player2 Wins!'
      } else if (data.cards[0].value > data.cards[1].value) {
        document.querySelector('#results').innerText = 'Player1 Wins!'
      } else {
        document.querySelector('#results').innerText = 'WAR!'
      }
      if (data.remaining === 0) { //Function that shuffles the deck
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
          .then(res => res.json())
          .then(data => {
            data.shuffled = true
          })
          .catch(error => console.log(error))
      }
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}
