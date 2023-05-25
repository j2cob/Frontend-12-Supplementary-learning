/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useEffect } from "react";

export const withAuth = (Component) => (props) => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("codebootcamp")) {
      alert("로그인을 먼저 해주세요");
      router.push("/");
    }
  }, []);

  return <Component {...props} />;
};
