import Sidenav from "./Sidenav";

export default function Layout({ children }) {
  return (
    <body className="flex flex-row w-screen bg-blue-200">
      <Sidenav />
      <main className="w-full h-screen p-8 ">{children}</main>
    </body>
  );
}
