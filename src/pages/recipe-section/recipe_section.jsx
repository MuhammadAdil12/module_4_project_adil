import { useState, useEffect } from 'react';
import './recipe_section.css';
import { Link } from 'react-router-dom';

import {fetch_recipe_data} from "../../ApiService/fetch-recipe-data"

export const Recipe_section = () => {
    const [userInput, setUserInput] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    
    const [ApiId, setApiId] = useState('');
    const [ApiKey, setApiKey] = useState('');



    useEffect(() => {
      const fetchAPI = async () => {
              try {
                const key = await fetch_recipe_data(); 
                setApiId(key[0].recipe_section_Api_ID)
                setApiKey(key[0].recipe_section_Api_key)
            } catch (error) {
                console.log(error, "something is wrong in fetching the key");
          }
      
      };
  
      if (userInput.trim() !== '') {
          fetchAPI();
      }
  }, [userInput]);
  



    const fetchData = async() => {

        try {
           setLoading(true)
          const baseURL = `https://api.edamam.com/search?q=${userInput}&app_id=${ApiId}&app_key=${ApiKey}&from=0&to=20`;
          const response = await fetch(baseURL);
          const data = await response.json()
          setRecipes(data.hits);
          setLoading(false)
      } catch (error) {
          console.log(error);
          setLoading(false)

}

    }

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const toggleIngredientListVisibility = (index) => {
        const updatedRecipes = [...recipes];
        updatedRecipes[index].showIngredients = !updatedRecipes[index].showIngredients;
        setRecipes(updatedRecipes);
    };

    return (
        <>
                <Link to="/home">
                    <span className="material-symbols-outlined back-arrow"> arrow_back</span>
                </Link>
            <section id="main-section">
                <div className="container-one">
                    <h1 className="food-finder">Fresh Food Finder</h1>
                    <form id="search-form-control" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Search Something..."
                            id="user-input"
                            value={userInput}
                            onChange={handleInputChange}
                        />
                        <span onClick={()=> fetchData()} className="material-symbols-outlined icon" id="search-icon">
                            search
                        </span>
                    </form>
                    <div className="loading-parent">
                        {loading && <div className="loading">Loading...</div>}
                    </div>
                    <div className="result-item-from-search">
                        {recipes.map((recipe, index) => (
                            <div key={index} className="item-from-recipe-section">
                                <img src={recipe.recipe.image} alt="" />
                                <div className="flex-container">
                                    <h1 className="title">{recipe.recipe.label}</h1>
                                    <a href={recipe.recipe.url} className="view-recipe" target="_blank" rel="noreferrer">
                                        View Recipe
                                    </a>
                                </div>

                                <p className="data-cal">Calories: {recipe.recipe.calories.toFixed(1)}</p>
                                <p className="data-cal">Cuisine: {recipe.recipe.cuisineType}</p>
                                <p className="data-cal">
                                    Diet label:{' '}
                                    {recipe.recipe.dietLabels.length > 0 ? recipe.recipe.dietLabels : 'Not Available'}
                                </p>
                                <div className="expand-ingredient" onClick={() => toggleIngredientListVisibility(index)}>
                                    <p className='expand-ingredient-p-tag'>
                                        Ingredients
                                        <span className="material-symbols-outlined expand-icon">
                                            {recipe.showIngredients ? 'expand_less' : 'expand_more'}
                                        </span>
                                    </p>
                                    {recipe.showIngredients && (
                                        <ul className="ingredient-list">
                                            {recipe.recipe.ingredientLines.map((ingredient, idx) => (
                                                <li key={idx}>{ingredient}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};
