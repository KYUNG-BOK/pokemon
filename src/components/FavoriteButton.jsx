import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorite,
  removeFromFavorite,
  selectFavoriteIds,
} from "../features/pokemon/favoriteSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function FavoriteButton({ id }) {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavoriteIds);
  const isFavorite = favoriteIds.includes(id);

  const handleToggle = (e) => {
    e.preventDefault();  
    e.stopPropagation(); 

    if (isFavorite) {
      dispatch(removeFromFavorite(id));
    } else {
      dispatch(addToFavorite(id));
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="absolute top-2 right-2 text-red-500 text-xl z-10"
      aria-label={isFavorite ? "찜 해제" : "찜하기"}
    >
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}