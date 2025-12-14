import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/button/page";

// 1. Change the function declaration to 'async'
export default async function Page() {
  // 2. The usage of cookies().get(...) remains the same and now works correctly
  const token =  (await cookies()).get("session")?.value;

  if (!token) {
    redirect("/signin");
  }

  try {
    // 3. jwt.verify is a synchronous operation, so no await is needed here
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    redirect("/signin");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>Welcome, you are logged in</h1>
      <LogoutButton />
    </div>
  );
}