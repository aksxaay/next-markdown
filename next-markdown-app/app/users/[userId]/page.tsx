type Params = {
  params: {
    userId: string;
  };
};
export default function page({ params: { userId } }: Params) {
  return <div>page</div>;
}
