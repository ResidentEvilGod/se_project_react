import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const userName = currentUser?.name || "";
  const userAvatar = currentUser?.avatar || "";
  const avatarFallbackLetter = (userName.trim()[0] || "?").toUpperCase();

 return (
    <aside className="sidebar">
      <div className="sidebar__row">
        {/* avatar or placeholder */}
        <p className="sidebar__username">{userName}</p>
      </div>

      <div className="sidebar__actions">
        <button
          type="button"
          className="sidebar__button"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
