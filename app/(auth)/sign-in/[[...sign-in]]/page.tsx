import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-full w-full bg-slate-600 flex gap-2 ">
      <div
        className="bg-no-repeat bg-cover bg-center w-full"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')",
        }}
      ></div>
      <div className="w-full flex items-center justify-center p-10 h-screen ">
        <SignUp path="/sign-in" />
      </div>
    </div>
  );
}
  