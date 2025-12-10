import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddGarmentModal,
}) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__row">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          onClick={handleOpenAddGarmentModal}
          className="clothes-section__btn"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__card-list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              data={item}
              onCardClick={handleOpenItemModal}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;
