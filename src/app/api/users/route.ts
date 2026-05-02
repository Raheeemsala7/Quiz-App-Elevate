import { getUsersApi } from "@/src/features/audit-log/apis/audit-log.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = await getUsersApi(req);

  return NextResponse.json(data);
}