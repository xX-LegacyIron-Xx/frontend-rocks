import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Detail } from "./Detail";
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./Home.tsx";
import { PokemonList } from "./PokemonList";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/frontend-rocks" element={<Home />} />
        <Route path="/frontend-rocks/pokemons" element={<PokemonList />} />
        <Route path="/frontend-rocks/dettaglio/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
