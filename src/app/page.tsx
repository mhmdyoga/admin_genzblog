import Articlespage from "@/components/pages/Articlespage";
import ProtectedRouteAdmin from "@/components/protectedRoute/protectedRoute";


export default function Home() {
  return (
    <>
    <ProtectedRouteAdmin>
      <Articlespage/>
    </ProtectedRouteAdmin>
    </>
  );
}
