import { getExamsApi } from "@/src/features/lib/features/exams/api";
import { ArrowLeft, ArrowRight, BookOpenCheck, ChevronLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import ExamsList from "../_components/exams-list";
import ErrorBoundary from "@/src/features/components/shared/error-boundary";
import { IExam } from "@/src/features/lib/types/exam";

interface IPageProps {
  params: Promise<{
    id: [string, string, string];
  }>
}

const Page = async ({ params }: IPageProps) => {
  let id = await params

  const title = typeof decodeURIComponent(id.id[2]) === "string" ? decodeURIComponent(id.id[1]) + " " + decodeURIComponent(id.id[2]) : decodeURIComponent(id.id[1]);


  const examsData = await getExamsApi(id.id[0])


let exams: Array<IExam> = [];


  if ("payload" in examsData) {
    exams = examsData.payload.data;
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <Link href={"/"} className="py-4 px-1 border border-blue-600">
          <ChevronLeft className="text-blue-600 size-6" />
        </Link>

        <div className="flex gap-3 items-center bg-blue-600 flex-1 px-3 py-3">
          <BookOpenCheck className="size-10 text-white" />
          <h6 className="text-3xl font-semibold text-white">{title}</h6>
        </div>

      </div>

      <ErrorBoundary fallback={<p>Error loading exams</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <ExamsList id={id.id[0]} examsData={exams} />
        </Suspense>
      </ErrorBoundary>

    </>
  )
};

export default Page;