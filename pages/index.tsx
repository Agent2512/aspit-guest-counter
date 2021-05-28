import { GetServerSidePropsContext } from "next"
import Header from "../components/main/Header";
import { dbConnect, query } from "../utils/dbConnect"
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

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   await new userControl().getAllUsers().then(i => {
//     // console.log(i[0].id);
//   })
//   return {
//     props: {}
//   }
// }