// "use client";
// import React from "react";
// import Image from "next/image";
// // import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";


// export default function Header() {
//   // const { user, isSignedIn } = useUser();

//   return (
//     <div className="p-1 border-b shadow-sm">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <Image width={50} height={60} src={"/logo.svg"} alt="logo"></Image>
//           <span className="text-xl">FormMatic</span>
//         </div>
     
//           <div className="flex items-center gap-3">
//             <Link href={'/dashboard'}>
        
//             {/* <button className="btn btn-outline hover:bg-primary">Dashboard</button> */}
//             <Button>Dashboard</Button>
            
//             </Link>
//             {/* <UserButton /> */}
//           </div>
     
//       </div>
//     </div>
//   );
// }

"use client";
import React from "react";
import Image from "next/image";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";

export default function Header() {
  const { user, isSignedIn } = useUser();
  const path = usePathname()
  return !path.includes('aiform') && (
    <div className="p-1 border-b shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image width={50} height={60} src={"/logo.svg"} alt="logo"></Image>
          <span className="text-xl">FormMatic</span>
        </div>
        {isSignedIn ? (
          <div className="flex items-center gap-3">
            <Link href={'/dashboard'}>
            {/* <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 border rounded-lg">
              Dashboard
            </button> */}
            <button className="btn btn-outline hover:bg-primary">Dashboard</button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <div>
            <SignInButton>
              <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 border rounded-lg">
                Get Started
              </button>
            </SignInButton>
          </div>
        )}
      </div>
    </div>
  );
}
