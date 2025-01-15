// This is a conceptual Node.js script for backend logic.
// It demonstrates how product recommendations would be generated.
// In a application, this would be an API endpoint interacting with a database (e.g., MongoDB).

// --- Conceptual Product Schema (would be stored in MongoDB) ---
const products = [
  {
    id: "p1",
    name: "Gentle Hydrating Cleanser",
    description: "A soothing cleanser perfect for sensitive and dry skin during any phase.",
    safeForPhase: ["Menstrual", "Follicular", "Ovulation", "Luteal"],
    ingredients: ["Hyaluronic Acid", "Glycerin", "Chamomile Extract"],
    skinType: ["Dry", "Sensitive", "Normal", "Combination"],
  },
  {
    id: "p2",
    name: "Vitamin C Brightening Serum",
    description: "Boosts radiance and evens skin tone, ideal for follicular and ovulation phases.",
    safeForPhase: ["Follicular", "Ovulation"],
    ingredients: ["Ascorbic Acid", "Ferulic Acid", "Vitamin E"],
    skinType: ["Normal", "Combination", "Oily"],
  },
  {
    id: "p3",
    name: "Salicylic Acid Spot Treatment",
    description: "Targets breakouts and excess oil, a must-have for the luteal phase.",
    safeForPhase: ["Luteal", "Menstrual"],
    ingredients: ["Salicylic Acid", "Tea Tree Oil", "Niacinamide"],
    skinType: ["Oily", "Combination", "Acne-prone"],
  },
  {
    id: "p4",
    name: "Hyaluronic Acid Moisturizer",
    description: "Deeply hydrates and plumps the skin, suitable for all phases and skin types.",
    safeForPhase: ["Menstrual", "Follicular", "Ovulation", "Luteal"],
    ingredients: ["Hyaluronic Acid", "Ceramides", "Squalane"],
    skinType: ["Dry", "Normal", "Combination", "Sensitive", "Oily"],
  },
  {
    id: "p5",
    name: "Gentle Exfoliating Toner",
    description: "Lightly exfoliates to reveal smoother skin, great for follicular and ovulation.",
    safeForPhase: ["Follicular", "Ovulation"],
    ingredients: ["Lactic Acid", "Glycolic Acid (low concentration)", "Aloe Vera"],
    skinType: ["Normal", "Combination", "Oily"],
  },
  {
    id: "p6",
    name: "Calming Clay Mask",
    description: "Detoxifies and soothes irritated skin, especially during luteal and menstrual phases.",
    safeForPhase: ["Luteal", "Menstrual", "Sensitive"],
    ingredients: ["Kaolin Clay", "Bentonite Clay", "Centella Asiatica"],
    skinType: ["Oily", "Combination", "Acne-prone", "Sensitive"],
  },
  {
    id: "p7",
    name: "Retinol Night Cream",
    description: "Promotes cell turnover and reduces fine lines, best for follicular and ovulation phases.",
    safeForPhase: ["Follicular", "Ovulation"],
    ingredients: ["Retinol", "Peptides", "Hyaluronic Acid"],
    skinType: ["Normal", "Dry", "Combination"],
  },
  {
    id: "p8",
    name: "Barrier Repair Balm",
    description: "Intensely nourishing for compromised skin barrier, ideal for dry or sensitive skin in any phase.",
    safeForPhase: ["Menstrual", "Follicular", "Ovulation", "Luteal"],
    ingredients: ["Ceramides", "Cholesterol", "Fatty Acids"],
    skinType: ["Dry", "Sensitive", "Normal"],
  },
]

// --- Function to get product recommendations ---
function getProductRecommendations(userSkinType, userCyclePhase) {
  console.log(`\n--- Generating recommendations for Skin Type: ${userSkinType}, Cycle Phase: ${userCyclePhase} ---`)

  if (!userSkinType && !userCyclePhase) {
    console.log("No filters provided. Returning all products.")
    return products
  }

  const recommendedProducts = products.filter((product) => {
    const matchesSkinType = userSkinType ? product.skinType.includes(userSkinType) : true
    const matchesCyclePhase = userCyclePhase ? product.safeForPhase.includes(userCyclePhase) : true
    return matchesSkinType && matchesCyclePhase
  })

  if (recommendedProducts.length === 0) {
    console.log("No products found matching the criteria.")
  } else {
    console.log("Recommended Products:")
    recommendedProducts.forEach((p) =>
      console.log(`- ${p.name} (Safe for: ${p.safeForPhase.join(", ")}, Skin Types: ${p.skinType.join(", ")})`),
    )
  }

  return recommendedProducts
}

// --- Example Usage (if this were a standalone script or part of a serverless function) ---
// Get recommendations for Oily skin in Luteal Phase
getProductRecommendations("Oily", "Luteal")

// Get recommendations for Dry skin in Menstrual Phase
getProductRecommendations("Dry", "Menstrual")

// Get recommendations for Normal skin in Follicular Phase
getProductRecommendations("Normal", "Follicular")

// Get recommendations with only skin type filter
getProductRecommendations("Sensitive", null)

// Get recommendations with only cycle phase filter
getProductRecommendations(null, "Ovulation")

// Get all products (no filters)
getProductRecommendations(null, null)
