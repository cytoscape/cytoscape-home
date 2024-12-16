import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ModalProvider } from "./context/ModalContext";

export function Layout({ children }) {
  return (
    <ModalProvider>
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </ModalProvider>
  );
}
