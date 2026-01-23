import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddGarmentModal,
  onCardLike,
  handleOpenEditProfileModal,
  handleSignOut,
}) {
  return (
    <main className="profile">
      <SideBar
        handleSignOut={handleSignOut}
        handleOpenEditProfileModal={handleOpenEditProfileModal}
      />

      <ClothesSection
        clothingItems={clothingItems}
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        handleOpenItemModal={handleOpenItemModal}
        onCardLike={onCardLike}
      />
    </main>
  );
}

export default Profile;



