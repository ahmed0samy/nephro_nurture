import "./globals.scss";
import Header from "./components/header/header";
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });
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
        <main className={inter.className}>
        <main className="main">{children}</main>
        </main>
      </body>
    </html>
  );
}
