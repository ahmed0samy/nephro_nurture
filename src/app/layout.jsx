import "./globals.scss";

export const metadata = {
  title: {
    default: "Enigma",
    template: "%s | Enigma",
  },
  description: "Enigma app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="main">

        <div className="scroller">
          {children}
        </div>
      </body>
    </html>
  );
}
