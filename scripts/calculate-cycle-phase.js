// This is a conceptual Node.js script for backend logic.
// In a real application, this would be an API endpoint interacting with a database (e.g., MongoDB).

function calculateCyclePhase(startDateStr, cycleLength, currentDateStr) {
  const startDate = new Date(startDateStr)
  const currentDate = new Date(currentDateStr || new Date()) // Use current date if not provided

  if (isNaN(startDate.getTime())) {
    return { error: "Invalid start date." }
  }

  const msPerDay = 1000 * 60 * 60 * 24
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime())
  const daysIntoCycle = Math.floor(diffTime / msPerDay) % cycleLength

  let phase = ""
  let routineSuggestion = ""

  // Typical cycle phases (adjust as needed for more precision)
  if (daysIntoCycle >= 0 && daysIntoCycle < 7) {
    // Days 1-7
    phase = "Menstrual Phase"
    routineSuggestion =
      "Focus on gentle hydration and soothing skincare. Avoid harsh exfoliants. Use a calming cleanser and a rich moisturizer."
  } else if (daysIntoCycle >= 7 && daysIntoCycle < 14) {
    // Days 8-14
    phase = "Follicular Phase"
    routineSuggestion =
      "Your skin might feel more balanced. Incorporate active serums like Vitamin C for brightness. Maintain good hydration."
  } else if (daysIntoCycle >= 14 && daysIntoCycle < 17) {
    // Days 15-17 (Ovulation window)
    phase = "Ovulation Phase"
    routineSuggestion =
      "Skin is often at its best. Light exfoliation can be beneficial. Keep your routine consistent and hydrating."
  } else if (daysIntoCycle >= 17 && daysIntoCycle < cycleLength) {
    // Days 18-28 (Luteal Phase)
    phase = "Luteal Phase"
    routineSuggestion =
      "Prepare for potential breakouts. Focus on calming and anti-acne ingredients like salicylic acid or niacinamide. Avoid heavy oils."
  } else {
    phase = "Unknown Phase"
    routineSuggestion = "Could not determine phase. Please check cycle data."
  }

  return {
    currentDate: currentDate.toISOString().split("T")[0],
    startDate: startDate.toISOString().split("T")[0],
    cycleLength,
    daysIntoCycle: daysIntoCycle + 1, // +1 to make it 1-indexed day
    phase,
    routineSuggestion,
  }
}

// Example usage (if this were a standalone script or part of a serverless function)
// console.log(calculateCyclePhase("2025-07-20", 28, "2025-07-25"));
// console.log(calculateCyclePhase("2025-07-20", 28, "2025-08-05"));
