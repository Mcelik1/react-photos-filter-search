import { BrowserRouter, Routes, Route } from "react-router-dom"
import GetRecipes from "./GetRecipes"
import RecipeDetail from "./RecipeDetail";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetRecipes />}></Route>
          <Route path="/test" element={<RecipeDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
