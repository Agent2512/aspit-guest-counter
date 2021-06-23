import React, { useState } from "react";
import Header from "../components/main/Header";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from 'next/router'
import AddData from "../components/datacharts/AddData";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Charts from "../components/datacharts/Charts";

export default function page() {
  const { height, width, size } = useWindowDimensions()
  const [loading, setLoading] = useState(true)
  useAuth(useRouter(), setLoading)



  if (loading) {
    return (<></>)
  }

  return (
    <>
      <Header />
      <main id="index" >
        <AddData />
        <div className="chart">
          <Charts />

        </div>
      </main>
    </>
  )
}

