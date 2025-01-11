import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log('Login API: Received data:', { email });

    if (!email || !password) {
      console.log('Login API: Missing email or password.');
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    console.log('Login API: Connected to database and users collection.');

    // Find user by email
    const user = await usersCollection.findOne({ email });
    if (!user) {
      console.log('Login API: User not found.');
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Login API: Invalid password.');
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    console.log('Login API: User authenticated successfully.');

    // Return user data including skinType and periodDate from database
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.name, // Using name as username
        skinType: user.skinType,
        periodDate: user.periodDate ? user.periodDate.toISOString().split('T')[0] : null, // Format as YYYY-MM-DD
        isLoggedIn: true
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Login API: Error during login:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
