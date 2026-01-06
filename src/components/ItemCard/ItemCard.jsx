import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ data, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isAuthorized = Boolean(currentUser?._id);

  // ✅ Check if the item was liked by the current user
  // (likes array should be an array of ids)
  const likes = Array.isArray(data?.likes) ? data.likes : [];
  const isLiked =
    isAuthorized &&
    likes.some((id) => {
      // supports either string ids or populated objects
      const likeId = typeof id === "string" ? id : id?._id;
      return likeId === currentUser._id;
    });

  // ✅ Like button className is always active if liked
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  function handleCardClick() {
    if (typeof onCardClick === "function") {
      onCardClick(data);
    }
  }

  function handleLike(e) {
    e.stopPropagation();
    if (!isAuthorized) return;

    if (typeof onCardLike === "function") {
      onCardLike({ id: data._id, isLiked });
    }
  }

  return (
    <li className="card" onClick={handleCardClick}>
      <h2 className="card__title">{data.name}</h2>

      {/* ✅ Hide like button for unauthorized users */}
      {isAuthorized && (
        <button
          type="button"
          className={itemLikeButtonClassName}
          aria-label={isLiked ? "Unlike" : "Like"}
          onClick={handleLike}
        >
          <svg
            className="card__like-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 21s-7.2-4.35-9.6-8.4C.7 9.8 2.1 6.5 5.4 5.4c1.9-.6 3.9 0 5.1 1.4C11.7 5.4 13.7 4.8 15.6 5.4c3.3 1.1 4.7 4.4 3 7.2C19.2 16.65 12 21 12 21z"
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <img src={data.imageUrl} alt={data.name} className="card__image" />
    </li>
  );
}

export default ItemCard;


