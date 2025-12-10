import avatar from "../../assets/avatar.svg";
import "./SideBar.css";

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__row">
        <p className="sidebar__username">Terrence Tegegne</p>
        <img
          src={avatar}
          alt="Terrence Tegegne's Avatar"
          className="sidebar__avatar"
        />
      </div>
    </aside>
  );
}

export default SideBar;
