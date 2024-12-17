import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import PropTypes from "prop-types";

export function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </>
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
