import { getAuditLogsApi } from "@/src/features/audit-log/apis/audit-log.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const data = await getAuditLogsApi(req);
    return NextResponse.json(data);
}