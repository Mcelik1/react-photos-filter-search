import {useState, useEffect} from "react"
import Article from "./Article"
// import { Link } from "react-router-dom"

export default function GetImages() {
    const [images, setImages] = useState([])
    const [filteredImages, setfilteredImages] = useState([])
    const [person, setPerson] = useState([])
    let [searchValue, setSearchValue] = useState("")

    const fetchPerson = async () => {
        const response = await fetch(
            `https://api.unsplash.com/users/celikopter?client_id=NuKBMOGShAj-nxk2kHNd_ypv20j48mAPHZM-EbthN4s`
        )
        const data = await response.json()
        setPerson(data)
        console.log(data)
        // console.log('person call')
    }

    const fetchImages = async () => {
        const response = await fetch(
            `https://api.unsplash.com/photos?client_id=NuKBMOGShAj-nxk2kHNd_ypv20j48mAPHZM-EbthN4s`
        )
        const data = await response.json()
        console.log(data)
        setImages(data)
    }

    useEffect(() => {
        setfilteredImages(images);
        fetchPerson()
        fetchImages()
    }, [])


    function handleClick(e) {
        e.preventDefault();
        setSearchValue("")
        let filterImages = [];
        filterImages =  images.filter(image => image.likes > 20);
        console.log(filterImages);
        setfilteredImages(filterImages);
    }

    function handleChange(e) {
        e.preventDefault();
        setSearchValue(e.target.value)
        let filterImages = [];

        if (searchValue !== "") {
            filterImages = images.filter(image => image.id.includes(searchValue.toLowerCase()));
            setfilteredImages(filterImages)
        } else {
            setfilteredImages(images);
        }

        console.log('search value', searchValue);
        console.log('filter', filterImages);
        setfilteredImages(filterImages);
    }


    return (
        <>

            <div className="container mx-auto px-5 2xl:px-0">
                <h1 className="text-slate-800 font-bold text-3xl md:text-4xl lg:text-6xl my-10 lg:mt-20 lg:mb-14">
                    Recommended For You {person.name}
                </h1>

                <button
                    className="bg-blue-500 mb-4 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    onClick={handleClick}>
                    Filter Images Over 12 Likes
                </button>

                <input
                    className="shadow mt-4 mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="search"
                    placeholder="Search Here By ID"
                    value={searchValue}
                    onChange={handleChange}
                />
                {!filteredImages ? (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                ) : (
                    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 pb-20 lg:container">

                        {searchValue.length > 1 || filteredImages.length > 1 ? (
                            filteredImages.map((image) => {
                                return (
                                    <Article key={image.id} {...image} />
                                )
                            })
                        ) : (
                            images.map((image) => {
                                return (
                                    <Article key={image.id} {...image} />
                                )
                            })
                        )}
                    </section>
                )}
            </div>
        </>
    )
}
