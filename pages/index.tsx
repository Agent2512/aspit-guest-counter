import { GetServerSidePropsContext, GetStaticPropsContext, Redirect } from "next"
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import Header from "../components/main/Header";
import { useApi } from "../hooks/useApi";
import { Iapi, IuserToken } from "../interfaces";
import { userControl } from "../utils/userControl";

export default function page() {
  const router = useRouter()

  useEffect(() => {
    fetch(`/api/user/get`, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({})
    }).then(res => res.json()).then(i => console.log(i))
  },[])

  return (
    <>
      <Header />
      <main>
        <p>this is a test</p>
      </main>
    </>
  )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   // let auth = await new userControl().Auth(context)
//   // if ((auth as Redirect).destination) return { redirect: auth }
//   // else auth = auth as IuserToken

//   return {
//     props: {}
//   }
// }