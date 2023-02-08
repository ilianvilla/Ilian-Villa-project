import "./searchItem.scss";

const SearchItem = () => {
  return (
    <div className="searchItem">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="search-item-image"
      />
      <div className="search-item-description">
        <h1 className="search-item-title">Tower Street Apartments</h1>
        <span className="search-item-distance">500m from center</span>
        <span className="search-item-taxi">Free airport taxi</span>
        <span className="search-item-subtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="search-item-features">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="search-item-cancel">Free cancellation </span>
        <span className="search-item-cancel-subtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="search-item-details">
        <div className="search-item-rating">
          <span>Excellent</span>
          <button>8.9</button>
        </div>
        <div className="search-item-detail-texts">
          <span className="search-item-price">$112</span>
          <span className="search-item-tax">Includes taxes and fees</span>
          <button className="search-item-check-button">See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;