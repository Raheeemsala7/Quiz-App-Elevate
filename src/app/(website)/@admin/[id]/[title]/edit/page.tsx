import FormDiploma from "@/src/features/diploma/_components/form-dioloma"
import { getDiplomaApi } from "@/src/features/diploma/apis/diploma.api"
import { notFound } from "next/navigation"

interface IProps {
  params: Promise<{
    id: string;
    title: string
  }>
}

const page = async ({ params }: IProps) => {

  const { id, title } = await params


  const diploma = await getDiplomaApi(id)

  if (!diploma || !diploma.status) {
    return notFound()
  }

  console.log(diploma)

  return <FormDiploma initialData={diploma.payload.diploma} />
}

export default page