let drinkNumber = 0;

document.querySelector('.searchBtn').addEventListener('click', unhideInfo);
document.getElementById('randomDrink').addEventListener('click', showRandom);

document.getElementById('arrowLeft').addEventListener('click', function(){ moveNext('left') });
document.getElementById('arrowRight').addEventListener('click', function(){ moveNext('right') });

function unhideInfo() {
    if (document.querySelector('.query').value) {
        document.querySelector(".warn").style.display = "none";
        document.querySelector(".resultBox").style.display = "block";
        document.querySelector(".prepInstructions").style.display = "block";
        findDrink();
    }
    else {
        document.querySelector(".warn").style.display = "block";
        document.querySelector('.info').style.display = "none";
    }
    
}

function findDrink() {
    drinkNumber = 0;
    let searchQuery = document.querySelector('.query').value
    document.getElementById("arrowRight").style.display = "block";
    document.querySelector(".drinkIntro").style.display = "flex";
    document.querySelector('.info').style.display = "none";

    
    fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`)
    .then(res => res.json())
    .then(data => {
        
        console.log(data)
        if (searchQuery !== '') {
            if (!data.drinks) {
                document.querySelector('.info').style.display = "block";
            }
            else {
                document.querySelector('img').src = data.drinks[0].strDrinkThumb;
                document.querySelector('h3').innerText = data.drinks[0].strDrink;
                document.querySelector('.prepInstructions').innerText = 'How to prepare: \n\n' + data.drinks[0].strInstructions;
                
                let li;
                let i = 1;
                let ul = document.querySelector(".drinkIngredients");
                
                while (ul.firstChild) {
                    ul.removeChild(ul.lastChild);
                }

                for (let property in data.drinks[0]) {
                    
                    li = document.createElement("li");
                    let drinkIngredient = 'strIngredient' + i;
                    let ingredientMeasure = 'strMeasure' + i;

                    if (data.drinks[0][drinkIngredient] === "" && data.drinks[0][drinkMeasure] === "") {
                        data.drinks[0][drinkIngredient] = null;
                        data.drinks[0][drinkMeasure] = null;
                    }
                    else if (property === drinkIngredient && data.drinks[0][drinkIngredient] != null) {
                        li.appendChild(document.createTextNode(data.drinks[0][drinkIngredient]));
                        if (data.drinks[0][ingredientMeasure] != null) {
                            li.appendChild(document.createTextNode(': ' + data.drinks[0][ingredientMeasure]));
                            console.log(data.drinks[0][ingredientMeasure]);
                        }
                        console.log(data.drinks[0][drinkIngredient]);
                        ul.appendChild(li);
                        i++;
                    }
            }
            }
            
        }
        else {
            document.getElementById("arrowRight").style.display = "none";
            document.querySelector(".drinkIntro").style.display = "none";
            document.querySelector(".prepInstructions").style.display = "none";
        }
        
    })
    .catch(err => {
        console.log(`error ${err}`);
    })
}
        
function moveNext(direction) {
    if (direction === 'right') {
        drinkNumber++;
        switchDrink(drinkNumber);
    }
    else if (direction === 'left'){
        drinkNumber--;
        switchDrink(drinkNumber);
    }
}
    
function switchDrink(drinkNumber) {
    let searchQuery = document.querySelector('.query').value
    fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        

        if (drinkNumber === 0) {
            document.getElementById("arrowLeft").style.display = "none";
            document.getElementById("arrowRight").style.display = "block";
        }
        else if (data.drinks[drinkNumber] === data.drinks[data.drinks.length - 1]) {
            document.getElementById("arrowRight").style.display = "none";
        }
        else if (drinkNumber > 0) {
            document.getElementById("arrowLeft").style.display = "block";
            document.getElementById("arrowRight").style.display = "block";
        }
        

        document.querySelector('img').src = data.drinks[drinkNumber].strDrinkThumb;
        document.querySelector('h3').innerText = data.drinks[drinkNumber].strDrink;
        document.querySelector('.prepInstructions').innerText = 'How to prepare: \n\n' + data.drinks[drinkNumber].strInstructions;
        
        let li;
        let i = 1;
        let ul = document.querySelector(".drinkIngredients");
        
        while (ul.firstChild) {
            ul.removeChild(ul.lastChild);
        }

        for (let property in data.drinks[drinkNumber]) {
            
            li = document.createElement("li");
            let drinkIngredient = 'strIngredient' + i;
            let ingredientMeasure = 'strMeasure' + i;

            if (data.drinks[drinkNumber][drinkIngredient] === "" && data.drinks[drinkNumber][drinkMeasure] === "") {
                data.drinks[drinkNumber][drinkIngredient] = null;
                data.drinks[drinkNumber][drinkMeasure] = null;
            }
            else if (property === drinkIngredient && data.drinks[drinkNumber][drinkIngredient] != null) {
                li.appendChild(document.createTextNode(data.drinks[drinkNumber][drinkIngredient]));
                if (data.drinks[drinkNumber][ingredientMeasure] != null) {
                    li.appendChild(document.createTextNode(': ' + data.drinks[drinkNumber][ingredientMeasure]));
                    console.log(data.drinks[drinkNumber][ingredientMeasure]);
                }
                console.log(data.drinks[drinkNumber][drinkIngredient]);
                ul.appendChild(li);
                i++;
            }
        }
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}


// I'm feeling luck button
function showRandom() {
    document.querySelector('.query').value = null;
    document.querySelector(".warn").style.display = "none";
    document.getElementById("arrowLeft").style.display = "none";
    document.getElementById("arrowRight").style.display = "none";
    document.querySelector(".drinkIntro").style.display = "flex";
    document.querySelector(".resultBox").style.display = "block";
    document.querySelector(".prepInstructions").style.display = "block";



    fetch (`https://www.thecocktaildb.com/api/json/v1/1/random.php
    `)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        

        document.querySelector('img').src = data.drinks[0].strDrinkThumb;
        document.querySelector('h3').innerText = data.drinks[0].strDrink;
        document.querySelector('.prepInstructions').innerText = 'How to prepare: \n\n' + data.drinks[0].strInstructions;
        
        let li;
        let i = 1;
        let ul = document.querySelector(".drinkIngredients");
        
        while (ul.firstChild) {
            ul.removeChild(ul.lastChild);
        }

        for (let property in data.drinks[0]) {
            
            li = document.createElement("li");
            let drinkIngredient = 'strIngredient' + i;
            let ingredientMeasure = 'strMeasure' + i;

            if (property === drinkIngredient && data.drinks[0][drinkIngredient] != null) {
                li.appendChild(document.createTextNode(data.drinks[0][drinkIngredient]));
                if (data.drinks[0][ingredientMeasure] != null) {
                    li.appendChild(document.createTextNode(': ' + data.drinks[0][ingredientMeasure]));
                    console.log(data.drinks[0][ingredientMeasure]);
                }
                console.log(data.drinks[0][drinkIngredient]);
                ul.appendChild(li);
                i++;
            }
        }
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}


