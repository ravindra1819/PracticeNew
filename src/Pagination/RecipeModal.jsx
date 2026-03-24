export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={onClose}>✖</button>
        <img src={recipe.image} alt={recipe.name} className="modalImage" />
        <h2>{recipe.name}</h2>
        <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
        <p><strong>Rating:</strong> ⭐ {recipe.rating}</p>
        <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} mins</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>

        <h4>Ingredients:</h4>
        <ul>
          {recipe.instructions?.map((ing,i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
        <h4>Ingredients:</h4>
        <ol>
          {recipe.instructions?.map((step,i) =>(
            <li key={i}>{step}</li>
          ))}
        </ol>

      </div>
    </div>
  )
}