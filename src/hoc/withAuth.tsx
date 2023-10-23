"use client";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

export default function withAuth(WrappedComponent: any) {
  return function WithAuth(props: any) {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useLayoutEffect(() => {
      if (typeof window !== "undefined") {
        const accessToken = localStorage.getItem("isLoggedIn");
        if (accessToken !== null && !JSON.parse(accessToken)) {
          router.replace("/");
        } else {
          setIsLoggedIn(true);
        }
      }
    }, []);

    return isLoggedIn ? <WrappedComponent {...props} /> : null;
  };
}
