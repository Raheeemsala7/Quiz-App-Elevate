interface IPageProps {
    params: Promise<{
    id: string[];
  }>
}

const Page = async ({ params }: IPageProps) => {
  let id = await params
  console.log(id)
  return <div>jkjkjk</div>;
};

export default Page;