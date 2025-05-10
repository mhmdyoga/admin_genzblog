"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRouteAdmin = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "Admin") {
      router.replace("/unauthorized"); // Redirect to error or unauthorized page
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (isAuthorized === null) {
    return <div>Loading...</div>; // Optional loading state
  }

  return <>{children}</>;
};

export default ProtectedRouteAdmin;