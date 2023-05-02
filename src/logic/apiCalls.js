import scryfall from 'scryfall-client'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'

export const searchAutocomplete = (cardName) => {
  return scryfall.autocomplete(cardName)
}

export const imageByName = (name) => {
  return scryfall.get('cards/named', {
    fuzzy: name
  })
}

export const transformText = (text) => {
  if (text) {
    const matches = text.match(/{(.)(\/(.))?}/g)
    if (matches) {
      matches.forEach(function (symbol) {
        const key = symbol.slice(1, -1)

        text = text.replace(
          symbol,
          '<img class="icons" src="' + scryfall.getSymbolUrl(key) + '"/>'
        )
      })
    }
  }

  const cleanText = DOMPurify.sanitize(text)
  return parse(cleanText)
}

export const getPrintsImgs = (name) => {
  return scryfall.getCardNamed(name)
    .then(card => card.getPrints())
    .then(allPrints => allPrints.map(
      (print) => print.image_uris.normal
    ))
}
