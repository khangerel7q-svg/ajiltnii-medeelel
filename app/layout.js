import "./globals.css";

export const metadata = {
  title: "Байгууллагын Бүртгэлийн Систем",
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
