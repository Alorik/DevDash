import { connectDb } from "@/lib/db/mongodb";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

  try {
    await connectDb();
    
  }
}
