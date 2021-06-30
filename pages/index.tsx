import React, { useState } from "react";
import Header from "../components/main/Header";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from 'next/router'
import AddData from "../components/datacharts/AddData";
import Charts from "../components/datacharts/Charts";

export default function page() {
  const [loading, setLoading] = useState(true)
  useAuth(useRouter(), () => setLoading(false))



  if (loading == false) {
    return (
      <>
        <Header />
        <main id="index" >
          <AddData />
          <Charts />
        </main>
      </>
    )
  }

  return (
    <>
      <Header noMenu />
      <main></main>
    </>
  )
}

