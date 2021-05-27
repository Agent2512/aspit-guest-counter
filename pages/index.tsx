import { GetServerSidePropsContext } from "next"
import { dbConnect, query } from "../utils/dbConnect"
import { userControl } from "../utils/userControl";

export default function page() {

  return (
    <div>
      <p>this is a test</p>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await new userControl().getAllUsers().then(i => {
    // console.log(i[0].id);
  })
  return {
    props: {}
  }
}