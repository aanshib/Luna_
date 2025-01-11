// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email || !name) {
      return NextResponse.json({ message: 'Email and name are required' }, { status: 400 })
    }

    console.log('Sending email to:', email, name)

    const { error } = await resend.emails.send({
      from: 'Luna Skin <bhavyadmn05@gmail.com>', // This must be a verified domain in Resend
      to: [email],
      subject: 'Welcome to Luna Skin - Subscription Confirmed! 🌙',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ec4899; font-size: 28px;">Welcome to Luna Skin! 🌙</h1>
            <p style="color: #6b7280;">Your personalized cycle-aware skincare journey begins now.</p>
          </div>

          <div style="background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%); padding: 25px; border-radius: 12px;">
            <h2 style="color: #1f2937;">Hi ${name}! 👋</h2>
            <p style="color: #4b5563;">Thank you for subscribing! You'll receive daily tips tailored to your cycle phase and skin type.</p>
          </div>

          <div style="margin-top: 20px;">
            <h3 style="color: #1f2937;">What to Expect:</h3>
            <ul style="color: #4b5563; line-height: 1.6;">
              <li>🌸 Daily skincare tips</li>
              <li>🧴 Personalized recommendations</li>
              <li>⏱ Phase transition reminders</li>
              <li>✨ Routine tweaks for skin health</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #ec4899;">Welcome aboard! 💖</p>
          </div>
        </div>
      `
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ message: 'Failed to send confirmation email' }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Confirmation email sent successfully',
      emailSent: true,
      recipient: email
    }, { status: 200 })

  } catch (error) {
    console.error('Email sending failed:', error)
    return NextResponse.json({ message: 'Failed to send confirmation email' }, { status: 500 })
  }
}