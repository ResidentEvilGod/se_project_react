import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleOpenAddGarmentModal,
  handleOpenItemModal,
  handleSignOut,
}) {
  return (
    <main className="profile">
      <SideBar handleSignOut={handleSignOut} /> {/* ✅ added */}
      <ClothesSection
        clothingItems={clothingItems}
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        handleOpenItemModal={handleOpenItemModal}
      />
    </main>
  );
}


export default Profile;
