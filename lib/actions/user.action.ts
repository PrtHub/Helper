'use server'

import User from "@/models/user.model";
import { connectToDatabase } from "../mongoose";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    console.log(error);
    
    throw error;
  }
}
