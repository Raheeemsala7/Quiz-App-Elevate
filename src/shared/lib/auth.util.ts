"use server"

import { authOptions } from "@/src/auth"
import { getServerSession } from "next-auth"

export async function getNextAuthToken() {
  const session = await getServerSession(authOptions)
  return session?.token ?? null
}