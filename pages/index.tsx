import { useState } from "react";
import Header from "../components/main/Header";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from 'next/router'
import AddData from "../components/datacharts/addData";

export default function page() {
  const [loading, setLoading] = useState(true)
  useAuth(useRouter(), setLoading)



  if (loading) {
    return (<></>)
  }

  return (
    <>
      <Header />
      <main id="index" >
        {/* <AddData /> */}
      </main>
    </>
  )
}

