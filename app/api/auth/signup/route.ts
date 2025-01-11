import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcrypt'; // Import bcrypt

export async function POST(req: Request) {
  try {
    const { name, email, password, skinType, periodDate } = await req.json(); // ✅ 1. Extract periodDate
    console.log('Signup API: Received data:', { name, email, skinType, periodDate });

    // ✅ 2. Validate all required fields including periodDate
    if (!name || !email || !password || !skinType || !periodDate) {
      console.log('Signup API: Missing required fields.');
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    console.log('Signup API: Connected to database and users collection.');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      console.log('Signup API: User with this email already exists.');
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Signup API: Password hashed.');

    // ✅ 3. Include periodDate in newUser
    const newUser = {
      name,
      email,
      password: hashedPassword,
      skinType,
      periodDate: new Date(periodDate),
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);
    console.log('Signup API: User inserted successfully:', result.insertedId);

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });

  } catch (error) {
    console.error('Signup API: Error during signup:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
