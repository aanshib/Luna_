// This is a conceptual Node.js script for backend logic.
// It demonstrates how notifications would be sent based on cycle phases.
// In a real application, this would be triggered by a cron job or scheduler,
// interact with a database (e.g., MongoDB) to fetch user data,
// and use an actual email service (like Nodemailer or SendGrid).

// --- Conceptual Data Structures (would come from a database) ---
const users = [
  {
    id: "user1",
    email: "user1@example.com",
    lastPeriodStartDate: "2025-07-20", // YYYY-MM-DD
    cycleLength: 28,
    // Other user preferences like notification frequency, preferred tips, etc.
  },
  {
    id: "user2",
    email: "user2@example.com",
    lastPeriodStartDate: "2025-07-05",
    cycleLength: 30,
  },
  // ... more users
]

// --- Helper Function to Calculate Cycle Phase (similar to frontend logic) ---
function getCyclePhaseAndTip(startDateStr, cycleLength, currentDateStr) {
  const startDate = new Date(startDateStr)
  const currentDate = new Date(currentDateStr || new Date())

  if (isNaN(startDate.getTime())) {
    return { phase: "Error", tip: "Invalid start date." }
  }

  const msPerDay = 1000 * 60 * 60 * 24
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime())
  const daysIntoCycle = Math.floor(diffTime / msPerDay) % cycleLength

  let phase = ""
  let tip = ""

  if (daysIntoCycle >= 0 && daysIntoCycle < 7) {
    phase = "Menstrual Phase"
    tip = "You’re in your menstrual phase—focus on gentle hydration and soothing skincare. Avoid harsh exfoliants."
  } else if (daysIntoCycle >= 7 && daysIntoCycle < 14) {
    phase = "Follicular Phase"
    tip =
      "You’re entering your follicular phase—your skin might feel more balanced. Consider incorporating active serums like Vitamin C."
  } else if (daysIntoCycle >= 14 && daysIntoCycle < 17) {
    phase = "Ovulation Phase"
    tip = "You’re in your ovulation phase—your skin is often at its best. Light exfoliation can be beneficial."
  } else if (daysIntoCycle >= 17 && daysIntoCycle < cycleLength) {
    phase = "Luteal Phase"
    tip =
      "You’re entering your luteal phase—prepare for potential breakouts. Focus on calming and anti-acne ingredients."
  } else {
    phase = "Unknown Phase"
    tip = "Could not determine your cycle phase. Please update your cycle data."
  }

  return { phase, tip }
}

// --- Conceptual Email Sending Function ---
async function sendEmail(toEmail, subject, htmlContent) {
  // In a real application, you would use an email sending library here, e.g.:
  // import nodemailer from 'nodemailer';
  // const transporter = nodemailer.createTransport({ ... config ... });
  // await transporter.sendMail({ from: 'your_email@example.com', to: toEmail, subject, html: htmlContent });

  console.log(`\n--- Sending Email to: ${toEmail} ---`)
  console.log(`Subject: ${subject}`)
  console.log(`Body: ${htmlContent}`)
  console.log("------------------------------------")
  return { success: true, message: "Email conceptually sent." }
}

// --- Main Notification Logic ---
async function sendCycleNotifications() {
  console.log("Starting daily cycle notification process...")
  const today = new Date().toISOString().split("T")[0] // Get today's date in YYYY-MM-DD format

  for (const user of users) {
    const { phase, tip } = getCyclePhaseAndTip(user.lastPeriodStartDate, user.cycleLength, today)

    const subject = `Your Daily Feminine Cycle Tip: ${phase}`
    const htmlContent = `
      <p>Hello,</p>
      <p>Based on your cycle data, you are currently in your <strong>${phase}</strong>.</p>
      <p>Here's a tip for your skincare routine this week:</p>
      <p>"${tip}"</p>
      <p>Stay beautiful!</p>
      <p>The Feminine Team</p>
    `

    // In a real scenario, you might only send weekly or based on specific phase changes
    // For this demo, we'll simulate sending for each user.
    await sendEmail(user.email, subject, htmlContent)
  }
  console.log("Cycle notification process completed.")
}

// --- How this would be scheduled (conceptual) ---
// This function would typically be called by a cron job or a Node.js scheduling library (e.g., node-schedule).
// For example, to run daily at a specific time:
// import schedule from 'node-schedule';
// schedule.scheduleJob('0 0 * * *', sendCycleNotifications); // Runs every day at midnight

// For demonstration purposes, we'll just call it once:
sendCycleNotifications().catch(console.error)
