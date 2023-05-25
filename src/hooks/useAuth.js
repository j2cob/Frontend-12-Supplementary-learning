import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const userLogin = localStorage.getItem("codebootcamp");
    if (!userLogin) {
      alert("로그인 후 이용 가능합니다!");
      void router.push("/");
    }
  }, [router]);
}
