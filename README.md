# Boozle - cocktail search app

Boozle is an app that allows to search drinks and cocktails (alcoholic and non-alcoholic) by name or ingredient.

**Link to project:** https://boozle.netlify.app/

![Boozle App Preview](https://github.com/roman-vasi1enko/roman-vasi1enko/raw/main/assets/boozle.gif)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

I used the API from [TheCocktailDB](https://www.thecocktaildb.com/) to fetch data about drinks and match it with queries entered by the user. Inspired by a Google search, I added a "Surprise me" button similar to "I'm feeling lucky" to throw random drinks when the user requires no specific ingredient.

## Optimizations

The pagination buttons ("left" and "right" emojis) are not always behaving as expected. The same goes for notifications. Sometimes they won't disappear when I would expect them to. These things need to be fixed should I decide to refactor the baddie code later.

## Lessons Learned:

While digging into DOM specifics learned that code like this:

><code> document.querySelector('h3').innerText</code>

**IS NOT JavaScript**. JavaScript doesn't even have it at its core. The DOM (Document Object Model) is essentially the API one uses to manipulate an HTML (or XML) document - ***usually*** using JavaScript. So the line of code above is a DOM API, not JS.
