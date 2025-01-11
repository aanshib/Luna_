// import { NextRequest, NextResponse } from 'next/server'
// import { connectToDatabase } from '@/lib/mongodb'

// export async function POST(request: NextRequest) {
//   try {
//     const { email } = await request.json()

//     console.log('Checking subscription for email:', email)

//     if (!email) {
//       return NextResponse.json(
//         { message: 'Email is required' },
//         { status: 400 }
//       )
//     }

//     const { db } = await connectToDatabase()
//     const subscriptions = db.collection('subscriptions')

//     const subscription = await subscriptions.findOne({ 
//       email, 
//       isActive: true 
//     })

//     console.log('Subscription found:', !!subscription)

//     return NextResponse.json({
//       isSubscribed: !!subscription,
//       subscription: subscription ? {
//         email: subscription.email,
//         name: subscription.name,
//         subscribedAt: subscription.subscribedAt,
//         preferences: subscription.preferences
//       } : null
//     }, { status: 200 })

//   } catch (error) {
//     console.error('Check subscription API error:', error)
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// }
import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const subscriptions = db.collection('subscriptions')

    const subscription = await subscriptions.findOne({ email, isActive: true })

    if (!subscription) {
      return NextResponse.json({
        isSubscribed: false,
        message: 'No active subscription found.'
      }, { status: 404 })
    }

    // ✅ Send email via Resend
    const emailResponse = await resend.emails.send({
  from: 'Lunaab <onboarding@resend.dev>',
  to: [email],
  subject: 'Your Daily Tip ✨',
  text: `Hi ${subscription.name || 'there'},

Here is your daily tip!

🧠 "Stay curious and keep learning!"

- Lunaab Team`,
})


    console.log('✅ Resend email response:', emailResponse)

    return NextResponse.json({
      isSubscribed: true,
      message: 'Email sent successfully!',
      subscription: {
        email: subscription.email,
        name: subscription.name,
        subscribedAt: subscription.subscribedAt,
        preferences: subscription.preferences
      }
    }, { status: 200 })

  } catch (error) {
    console.error('❌ Error in check-subscription:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}