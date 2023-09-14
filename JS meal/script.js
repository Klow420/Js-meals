const rechercher = document.querySelector("#rechercher");
const range = document.querySelector("#nombre");
const spannb = document.querySelector(".nbrange");
const btn = document.querySelector("#croissant");
const card = document.querySelector(".card");
let meal = [];
let allumer = true;
let sortMethod;

const fetchMeal = async() => {
    const result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${rechercher.value}`);
    const data = await result.json();
    meals = data.meals;
    DisplayMeals();
}
const DisplayMeals = () => {
    card.innerHTML = ""
    meals
    // filtrer les noms et les ingrédiants
    // .filter((m) => {
    //     const lowerCaseSearch = rechercher.value.toLowerCase();
    //     return (
    //         m.strInstructions.toLowerCase().includes(lowerCaseSearch) ||
    //         m.strMeal.toLowerCase().includes(lowerCaseSearch)
    //     );
    // })
    // pour trier avec un bouton seulement faire les modifs sur btn 
    .sort((a,b)=> {
        if (sortMethod === "croissant") {
            return a.strMeal.localeCompare(b.strMeal); 
        } else if (sortMethod === "décroissant") { 
            return b.strMeal.localeCompare(a.strMeal); 
        }
    })
    .slice(0,range.value)
    .forEach((m) => {
        card.innerHTML += `<div class="cardContainer">
        <p class="nom">${m.strMeal}</p>
        <p>Origine : ${m.strArea}</p>
        <img src="${m.strMealThumb}" alt="meal">
        <p class="meal-instructions">${m.strInstructions}</p>
    </div>`
    })
}
fetchMeal()
rechercher.addEventListener("input", (e) => {
    fetchMeal()
})
range.addEventListener("input", (e)=> {
    spannb.textContent = range.value;
    DisplayMeals()
})
// btn ici va changer avec le id et le textcontent pour que je puisse faire l'appel des id dans le sort()
btn.addEventListener("click",()=> {
    if (sortMethod === "croissant") {
        sortMethod = "décroissant";
        btn.id = "décroissant";
        btn.textContent = "Croissant";
    } else {
        sortMethod = "croissant";
        btn.id = "croissant";
        btn.textContent = "Décroissant";
    }
    DisplayMeals()
})