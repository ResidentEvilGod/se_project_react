import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  handleOpenAddGarmentModal,
  handleOpenItemModal,
  onCardLike,
}) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button
          type="button"
          className="clothes-section__add-new-btn"
          onClick={handleOpenAddGarmentModal}
        >
          + Add new
        </button>
      </div>

      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            data={item}
            onCardClick={handleOpenItemModal}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;


