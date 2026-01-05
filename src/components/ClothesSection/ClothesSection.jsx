import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddGarmentModal,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentUserId = currentUser?._id;
  const userItems = (clothingItems || []).filter((item) => {
    const ownerId = typeof item.owner === "string" ? item.owner : item.owner?._id;
    return Boolean(currentUserId) && ownerId === currentUserId;
  });

  return (
    <section className="clothes-section">
      <div className="clothes-section__row">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          onClick={handleOpenAddGarmentModal}
          className="clothes-section__btn"
          type="button"
        >
          + Add new
        </button>
      </div>

      <ul className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard key={item._id} data={item} onCardClick={handleOpenItemModal} />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;

