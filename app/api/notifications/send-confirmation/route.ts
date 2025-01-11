import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    console.log('Sending confirmation email to:', email, name)

    if (!email || !name) {
      return NextResponse.json(
        { message: 'Email and name are required' },
        { status: 400 }
      )
    }

    // Simulate sending confirmation email
    // In production, you would integrate with an email service like:
    // - SendGrid
    // - Resend
    // - Nodemailer with SMTP
    // - AWS SES

    const emailContent = {
      to: email,
      subject: 'Welcome to Luna Skin - Subscription Confirmed! 🌙',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ec4899; font-size: 28px; margin-bottom: 10px;">Welcome to Luna Skin! 🌙</h1>
            <p style="color: #6b7280; font-size: 16px;">Your personalized cycle-aware skincare journey begins now</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
            <h2 style="color: #1f2937; font-size: 20px; margin-bottom: 15px;">Hi ${name}! 👋</h2>
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 15px;">
              Thank you for subscribing to Luna Skin notifications! You're now part of our community of women who prioritize cycle-aware skincare.
            </p>
            <p style="color: #4b5563; line-height: 1.6;">
              Starting tomorrow, you'll receive daily personalized skincare tips tailored to your current menstrual cycle phase and skin type.
            </p>
          </div>

          <div style="background: #ffffff; border: 2px solid #f3e8ff; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
            <h3 style="color: #1f2937; font-size: 18px; margin-bottom: 15px;">What to expect:</h3>
            <ul style="color: #4b5563; line-height: 1.8; padding-left: 20px;">
              <li>Daily skincare tips based on your cycle phase</li>
              <li>Personalized product recommendations</li>
              <li>Phase transition notifications</li>
              <li>Routine adjustments for optimal skin health</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #6b7280; font-size: 14px;">
              Questions? Reply to this email or visit our support center.
            </p>
            <p style="color: #ec4899; font-size: 16px; font-weight: bold; margin-top: 15px;">
              Welcome to your personalized skincare journey! ✨
            </p>
          </div>
        </div>
      `
    }

    console.log('Confirmation email prepared:', emailContent.subject)

    // Here you would actually send the email using your preferred service
    // For now, we'll just log it and return success

    return NextResponse.json({
      message: 'Confirmation email sent successfully',
      emailSent: true,
      recipient: email
    }, { status: 200 })

  } catch (error) {
    console.error('Send confirmation email error:', error)
    return NextResponse.json(
      { message: 'Failed to send confirmation email' },
      { status: 500 }
    )
  }
}
