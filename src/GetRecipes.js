import {useState, useEffect} from "react"
import Pagination from "./Pagination";
import {Link} from "react-router-dom";
import './styles/GetRecipes.scss';

// import { Link } from "react-router-dom"

export default function GetRecipes() {

    const API_KEY = "3c3fe27299c045d19e7521d63ebec6ac";


    //State Management
    const [recipes, setRecipes] = useState([])
    let [searchValue, setSearchValue] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);


    //here we get the first and last post, to calculate how many we display
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    //currentPosts holds the amount calculated above using the default state of 5 in the stateHook
    const currentPosts = recipes.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);


    //fetch recipes using  search query
    const fetchRecipes = async (event) => {
        console.log('fetch recipes');
        if (event.key === 'Enter') {
            console.log('search value', searchValue);
            const response = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&number=20&apiKey=${API_KEY}&addRecipeInformation=true&fillIngredients=true`
            )
            const data = await response.json()
            console.log(data);
            setRecipes(data.results);
        }

    }

    //filter by cuisine, takes in string of cuisine
    const filterRecipesByCuisine = async cuisine => {

        console.log('fetch recipes cusine');

        console.log('search value', searchValue);
        const response = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&number=20&apiKey=${API_KEY}&addRecipeInformation=true&fillIngredients=true`
        )
        const data = await response.json()
        console.log(data);
        setRecipes(data.results);

    }

    useEffect(() => {

    }, [])


    return (
        <>
            <div className="container mx-auto px-5 2xl:px-0">
                <h1 className="text-slate-800 font-bold text-3xl md:text-4xl lg:text-6xl my-10 lg:mt-20 lg:mb-14">
                    Recipe Search
                </h1>

                <label htmlFor="search">Search Recipe by Keyword</label>
                <input
                    className="shadow mt-4 mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="search"
                    placeholder="Search Here By Keyword"
                    value={searchValue}
                    onChange={event => {
                        setSearchValue(event.target.value)
                    }}
                    onKeyDown={fetchRecipes}
                />

                <p className="mb-2">Or select from any of the cuisines below</p>
                <button
                    className="bg-blue-500 mb-4 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    onClick={() => filterRecipesByCuisine('italian')}>
                    Filter Recipes Italian
                </button>


                <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 pb-20 lg:container">
                    <div>
                        {currentPosts.length > 0
                            ? currentPosts.map((post) => {
                                return (
                                    <div>
                                        <Link to="/test" state={post}>{post.title}</Link>
                                    </div>
                                )
                            })
                            : <p></p>}

                    </div>
                </section>


                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={recipes.length}
                    paginate={paginate}
                />
            </div>
        </>
    )
}
