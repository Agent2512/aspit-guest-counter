import { useState } from "react";
import Header from "../components/main/Header";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from 'next/router'

export default function page() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useAuth().then(i => {
    if (i == false) router.replace("/login", "/")
    else setLoading(false);
  })

  if (loading) {
    return (
      <div></div>
    )
  }

  return (
    <>
      <Header />
      <main id="index">
      </main>
    </>
  )
}

