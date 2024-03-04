import { auth, signIn, signOut } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  console.log(session?.user);

  return (
    <main>
      <h1>Email Client App with Shadcn UI</h1>

      {session?.user ? (
        <>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="rounded-lg border border-emerald-500"
            >
              Sign Out
            </button>
          </form>
          <p>Logged in as {session?.user?.email}</p>
        </>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn();
          }}
        >
          <button
            type="submit"
            className="rounded-lg border border-emerald-500"
          >
            Sign In with google
          </button>
        </form>
      )}
    </main>
  );
}
