import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-dvh flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">
          Pokémon Card Gallery
        </h1>
        <p className="text-2xl text-white drop-shadow-md">
          Scopri tutti i Pokémon
        </p>
        <button
          onClick={() => navigate("/frontend-rocks/pokemons")}
          className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-xl rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Inizia
        </button>
      </div>
    </div>
  );
};