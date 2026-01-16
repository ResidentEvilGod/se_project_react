import { useContext, useEffect, useState } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleSignOut, handleOpenEditProfileModal }) {
  const currentUser = useContext(CurrentUserContext);

  const userName = currentUser?.name || "";
  const userAvatar = currentUser?.avatar || "";
  const avatarFallbackLetter = (userName.trim()[0] || "?").toUpperCase();

  const [isAvatarOk, setIsAvatarOk] = useState(true);

  useEffect(() => {
    setIsAvatarOk(true);
  }, [userAvatar]);

  return (
    <section className="sidebar">
      <div className="sidebar__row">
        {userAvatar && isAvatarOk ? (
          <img
            src={userAvatar}
            alt={`${userName}'s avatar`}
            className="sidebar__avatar"
            onError={() => setIsAvatarOk(false)}
          />
        ) : (
          <div
            className="sidebar__avatar-placeholder"
            aria-label={`${userName}'s avatar placeholder`}
          >
            {avatarFallbackLetter}
          </div>
        )}

        <p className="sidebar__username">{userName}</p>
      </div>

      <div className="sidebar__actions">
        <button
          type="button"
          className="sidebar__button"
          onClick={handleOpenEditProfileModal}
        >
          Change profile data
        </button>

        <button type="button" className="sidebar__button" onClick={handleSignOut}>
          Log out
        </button>
      </div>
    </section>
  );
}

export default SideBar;

