import "./globals.scss";
import Header from "./components/header/header";

export const metadata = {
  title: {
    default: "Nehpro Nurture",
    template: "%s | Nehpro Nurture",
  },
  description: "Nehpro Nurture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="body">
        <Header />
        <main>
        <div className="main">{children}</div>
        </main>
      </body>
    </html>
  );
}
