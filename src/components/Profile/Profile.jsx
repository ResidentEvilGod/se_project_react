import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleOpenItemModal,
  handleAddItemModalOpen,
  onCardLike,
  onEditProfile,
  onLogout,
}) {
  return (
    <main className="profile">
      <SideBar
        handleSignOut={onLogout}
        handleOpenEditProfileModal={onEditProfile}
      />

      <ClothesSection
        clothingItems={clothingItems}
        handleOpenAddGarmentModal={handleAddItemModalOpen}
        handleOpenItemModal={handleOpenItemModal}
        onCardLike={onCardLike}
      />
    </main>
  );
}

export default Profile;


