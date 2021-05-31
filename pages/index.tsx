import { GetServerSidePropsContext } from "next"
import Header from "../components/main/Header";
import { userControl } from "../utils/userControl";

export default function page() {

  return (
    <>
    <Header/>
    <main>
      <p>this is a test</p>
    </main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await new userControl().getUser(3,"id").then(i => {
    console.log(i);
  })
  return {
    props: {}
  }
}