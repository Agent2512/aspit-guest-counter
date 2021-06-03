import { GetServerSidePropsContext } from "next";
import Header from "../components/main/Header";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { useCookie } from "../hooks/useCookie";

export default function page() {
  const [val, setVal] = useCookie("jwt")
  useAuth()
  return (
    <>
      <Header />
      <main>
        <p>{val}</p>
        <button onClick={() => setVal((Number(val)+1).toString())} style={{height: "100px", width: "100px"}} >test</button>
      </main>
    </>
  )
}

