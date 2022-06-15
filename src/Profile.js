import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

export default function Profile() {
  const [person, setPerson] = useState([])
  const { username } = useParams()

  useEffect(() => {
    const fetchPerson = async () => {
      const response = await fetch(
        `https://api.unsplash.com/users/celikopter?client_id=NuKBMOGShAj-nxk2kHNd_ypv20j48mAPHZM-EbthN4s`
      )
      const data = await response.json()
      setPerson(data)
      console.log(data)
      // console.log('person call')
    }

    fetchPerson()
  }, [username])

  return (
    <>
      {/*<section className="showcase">*/}
      {/*  <div className="overlay relative">*/}
      {/*    {person.photos[0].urls.raw && (*/}
      {/*      <img*/}
      {/*        src={person.photos[0].urls.raw}*/}
      {/*        alt={person.name}*/}
      {/*        className="profile-image object-fit object-cover w-full"*/}
      {/*      />*/}
      {/*    )}*/}
      {/*    <h1 className="absolute bottom-5 left-5 uppercase text-white font-bold tracking-wide text-3xl md:text-4xl lg:text-5xl xl:text-6xl">*/}
      {/*      {person.name}*/}
      {/*    </h1>*/}
      {/*  </div>*/}

      {/*  <Link*/}
      {/*    to="/"*/}
      {/*    className="bg-black py-2 px-6 rounded shadow text-white tracking-wide inline-block mt-5"*/}
      {/*  >*/}
      {/*    &larr; Back*/}
      {/*  </Link>*/}
      {/*</section>*/}

      <h1 className="absolute top-5 left-5 uppercase text-black font-bold tracking-wide text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        {person.name}
      </h1>

      <section className="showcase">
        <div className="overlay relative">
              <h1 className="absolute bottom-5 left-5 uppercase text-white font-bold tracking-wide text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                {person.name}
              </h1>
        </div>
      </section>
    </>
  )
}
