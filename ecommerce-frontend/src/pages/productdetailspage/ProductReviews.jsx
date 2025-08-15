const reviewData = [
  { name: 'Raja Babu', stars: 5.0, comment: "Super product! Highly recommend." },
  { name: 'Satyanarayana', stars: 4.5, comment: "Nice quality, worth the price." },
  { name: 'Sai', stars: 5.0, comment: "Excellent! I want to buy more." },
  { name: 'Ram Seshu', stars: 4.0, comment: "Good value, fast delivery." },
]

export default function ProductReviews({ rating }) {
  return (
    <div className="product-reviews">
      <h2>Ratings & Reviews</h2>
      <div className="review-rating">
        <img
          src={`/frontend-images/ratings/rating-${rating.stars * 10}.png`}
          alt="rating image"
        />
        <span>{rating.count}</span>
      </div>

      {reviewData.map((review, i) => (
        <div className="review" key={i}>
          <div className="review-header">
            <strong>{review.name}</strong>
            <span className="review-stars">⭐ {review.stars}</span>
          </div>
          <p className="review-comment">"{review.comment}"</p>
        </div>
      ))}
    </div>
  );
}
