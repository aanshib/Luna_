import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import nodemailer from 'nodemailer'

// Utility: Get today's tip (simple rotating list)
function getTodaysTip(): string {
  const tips = [
    "Drink plenty of water to keep your skin hydrated.",
    "Never skip sunscreen, even on cloudy days!",
    "Cleanse your face every morning and night.",
    "Eat more greens for glowing skin.",
    "Avoid touching your face frequently."
  ]
  const index = new Date().getDate() % tips.length
  return tips[index]
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const subscriptions = db.collection('subscriptions')

    const activeSubscribers = await subscriptions.find({
      isActive: true,
      'preferences.dailyTips': true
    }).toArray()

    if (!activeSubscribers.length) {
      console.log('No active subscribers for daily tips.')
      return NextResponse.json(
        { message: 'No active subscribers for daily tips.' },
        { status: 200 }
      )
    }

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // e.g. your Gmail address
        pass: process.env.EMAIL_PASS  // e.g. Gmail App Password
      }
    })

    const tip = getTodaysTip()

    for (const subscriber of activeSubscribers) {
      try {
        await transporter.sendMail({
          from: `"Daily Tips" <${process.env.EMAIL_USER}>`,
          to: subscriber.email,
          subject: '🌞 Your Daily Skincare Tip',
          html: `
            <h2>Hello ${subscriber.name || 'there'},</h2>
            <p>Here's your tip for today:</p>
            <blockquote style="font-style: italic; color: #444;">${tip}</blockquote>
            <p>Stay glowing! ✨</p>
            <p><small>If you wish to unsubscribe, update your preferences in the app.</small></p>
          `
        })
        console.log(`✅ Tip sent to: ${subscriber.email}`)
      } catch (err) {
        console.error(`❌ Failed to send to ${subscriber.email}:`, err)
      }
    }

    return NextResponse.json(
      { message: `Tips sent to ${activeSubscribers.length} subscribers.` },
      { status: 200 }
    )

  } catch (error) {
    console.error('❌ Error sending daily tips:', error)
    return NextResponse.json(
      { message: 'Failed to send daily tips' },
      { status: 500 }
    )
  }
}
