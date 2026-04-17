import { BookOpenCheck, ChevronLeft } from "lucide-react";
import Link from "next/link";
import ExamsList from "../../../../../features/exams/_components/exams-list";


interface IPageProps {
  params: Promise<{
    id: string;
    title: string;
  }>
}

const Page = async ({ params }: IPageProps) => {
  let { id, title } = await params
  
  console.log(id,title)

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
      <ExamsList id={id} />
    </>
  )
};

export default Page;