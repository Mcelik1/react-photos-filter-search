import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import './styles/RecipeDetail.scss';

const RecipeDetail = () => {

    const location = useLocation();
    const data = location.state;
    console.log('child data', data);


    return (
        <div>
            <div className="recipe-info">
                <h1>Recipe Information</h1>
                <p>{data.title}</p>
                <img src={data.image} alt={data.title}/>
                <h2>Health Information</h2>
                <ul>
                    <li>Vegetarian:{data.vegetarian === true ? <span>Yes</span> : <span>No</span>}</li>
                    <li>Vegan:{data.vegan === true ? <span>Yes</span> : <span>No</span>}</li>
                    <li>Vegan:{data.dairyFree === true ? <span>Yes</span> : <span>No</span>}</li>
                </ul>
                <div className="ingredient-list">
                    <h2>List of ingredients</h2>
                    {data.extendedIngredients.map((ingredient) => {
                        return (
                            <div>

                                <p>{ingredient.name}</p>

                            </div>

                        )
                    })}
                </div>
                <div className="cooking-instructions">
                    {data.analyzedInstructions.map((ingredient) => {
                        console.log(ingredient);
                        return (
                            <div>
                                {ingredient.steps.map((instruction) => {
                                    console.log(instruction);
                                    return (
                                        <p>{instruction.step}</p>
                                        )

                                })}
                            </div>

                        )
                    })}
                </div>
                <div className="ingredient-information-measurements">
                    <h2>List of ingredients and measures</h2>
                    {data.extendedIngredients.map((ingredient) => {
                        return (
                            <div>

                                <p>{ingredient.name}</p>
                                <span>{ingredient.measures.us.amount}</span> <span>{ingredient.measures.us.unitLong}</span>

                            </div>

                        )
                    })}
                </div>


            </div>
            <div className="ingredient-info">

            </div>
        </div>

    );
};

export default RecipeDetail;