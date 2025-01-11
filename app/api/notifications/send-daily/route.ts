import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import nodemailer from 'nodemailer';

// Function to calculate current cycle phase
function calculateCyclePhase(periodDate: string): { phase: string; day: number } {
  const startDate = new Date(periodDate);
  const currentDate = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  const daysIntoCycle = Math.floor(diffTime / msPerDay) % 28;

  let phase = 'Unknown Phase';
  if (daysIntoCycle >= 0 && daysIntoCycle < 7) phase = 'Menstrual Phase';
  else if (daysIntoCycle >= 7 && daysIntoCycle < 14) phase = 'Follicular Phase';
  else if (daysIntoCycle >= 14 && daysIntoCycle < 17) phase = 'Ovulation Phase';
  else if (daysIntoCycle >= 17 && daysIntoCycle < 28) phase = 'Luteal Phase';

  return { phase, day: daysIntoCycle + 1 };
}

// Function to get personalized recommendations
function getPersonalizedRecommendations(phase: string, skinType: string): string {
  const recommendations: Record<string, Record<string, string>> = {
    'Menstrual Phase': {
      'Oily': '• Use gentle, oil-free cleansers\n• Apply clay masks 2-3 times this week\n• Keep hydration light with gel moisturizers\n• Avoid harsh exfoliation during this sensitive time',
      'Dry': '• Use cream-based cleansers\n• Apply rich, nourishing moisturizers\n• Use hydrating sheet masks\n• Gentle exfoliation with lactic acid',
      'Combination': '• Use balanced cleansers\n• Apply different moisturizers to T-zone and cheeks\n• Use gentle BHA on oily areas\n• Hydrating toner for dry areas',
      'Sensitive': '• Use fragrance-free, gentle products\n• Apply soothing ingredients like aloe vera\n• Avoid new products during this phase\n• Use mineral sunscreen for protection',
      'Normal': '• Maintain your regular routine\n• Focus on gentle, consistent care\n• Use a balanced moisturizer\n• Light exfoliation if needed'
    },
    'Follicular Phase': {
      'Oily': '• Introduce gentle exfoliation\n• Use niacinamide to control oil\n• Light, gel-based moisturizers\n• Salicylic acid spot treatments',
      'Dry': '• Increase hydration with hyaluronic acid\n• Use richer night creams\n• Gentle enzyme exfoliation\n• Face oils for extra nourishment',
      'Combination': '• Balance different areas of your face\n• Use targeted treatments\n• Gentle exfoliation 2x per week\n• Hydrating serums for dry areas',
      'Sensitive': '• Gradually introduce gentle actives\n• Use calming ingredients like chamomile\n• Patch test any new products\n• Focus on barrier repair',
      'Normal': '• Perfect time to try new products\n• Gentle exfoliation 2-3x per week\n• Maintain consistent routine\n• Add vitamin C serum'
    },
    'Ovulation Phase': {
      'Oily': '• Your skin may be at its best!\n• Light exfoliation to maintain glow\n• Oil-free moisturizers\n• Perfect time for photos!',
      'Dry': '• Skin should be well-hydrated\n• Maintain your moisturizing routine\n• Add a glow-enhancing serum\n• Your skin barrier is strong',
      'Combination': '• Balanced approach works well now\n• Your skin is most resilient\n• Good time for professional treatments\n• Maintain your current routine',
      'Sensitive': '• Your skin is least reactive now\n• Good time to introduce new products\n• Maintain gentle, consistent care\n• Skin should look its best',
      'Normal': '• Your skin is glowing naturally\n• Perfect time for minimal makeup\n• Maintain your routine\n• Great time for special occasions'
    },
    'Luteal Phase': {
      'Oily': '• Prepare for potential breakouts\n• Use salicylic acid preventatively\n• Clay masks 2-3 times per week\n• Avoid over-cleansing',
      'Dry': '• Increase moisturization\n• Use hydrating masks\n• Gentle, cream cleansers\n• Add face oils to routine',
      'Combination': '• Focus on problem areas\n• Use targeted treatments\n• Increase hydration overall\n• Be gentle with sensitive areas',
      'Sensitive': '• Extra gentle care needed\n• Avoid harsh ingredients\n• Use calming, anti-inflammatory products\n• Focus on barrier protection',
      'Normal': '• Prepare for potential changes\n• Maintain consistent routine\n• Add extra hydration\n• Monitor for any sensitivity'
    }
  };

  return recommendations[phase]?.[skinType] || '• Maintain your regular skincare routine\n• Stay consistent with gentle care';
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const secret = `Bearer ${process.env.CRON_SECRET}`;
    if (authHeader !== secret) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const subscriptions = db.collection('subscriptions');
    const activeSubscriptions = await subscriptions.find({ isActive: true }).toArray();

    const today = new Date().toISOString().split('T')[0];
    let emailsSent = 0;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    for (const subscription of activeSubscriptions) {
      try {
        if (subscription.lastNotificationSent === today) continue;

        const { phase, day } = calculateCyclePhase(subscription.periodDate);
        const recommendations = getPersonalizedRecommendations(phase, subscription.skinType);

        const emailHTML = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 25px;">
              <h1 style="color: #ec4899; font-size: 24px; margin-bottom: 5px;">Luna Skin Daily Tip 🌙</h1>
              <p style="color: #6b7280; font-size: 14px;">Personalized for ${subscription.name}</p>
            </div>

            <div style="background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
              <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 10px;">Today's Cycle Info</h2>
              <p style="color: #4b5563; margin-bottom: 5px;"><strong>Current Phase:</strong> ${phase}</p>
              <p style="color: #4b5563; margin-bottom: 5px;"><strong>Cycle Day:</strong> ${day}</p>
              <p style="color: #4b5563;"><strong>Skin Type:</strong> ${subscription.skinType}</p>
            </div>

            <div style="background: #ffffff; border: 2px solid #f3e8ff; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
              <h3 style="color: #1f2937; font-size: 16px; margin-bottom: 15px;">Today's Personalized Tips:</h3>
              <div style="color: #4b5563; line-height: 1.8; white-space: pre-line;">${recommendations}</div>
            </div>

            <div style="text-align: center; margin-top: 25px;">
              <p style="color: #6b7280; font-size: 12px;">
                You're receiving this because you subscribed to Luna Skin notifications.
              </p>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: subscription.email,
          subject: `Your Daily Luna Skin Tip - Day ${day} (${phase}) 🌙`,
          html: emailHTML,
        });

        await subscriptions.updateOne(
          { _id: subscription._id },
          { $set: { lastNotificationSent: today } }
        );

        emailsSent++;
      } catch (error) {
        console.error(`Error processing subscription for ${subscription.email}:`, error);
      }
    }

    return NextResponse.json({
      message: 'Daily notifications sent successfully',
      totalSubscriptions: activeSubscriptions.length,
      emailsSent,
      date: today,
    }, { status: 200 });

  } catch (error) {
    console.error('Send daily notifications error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
