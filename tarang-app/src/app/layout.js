import './globals.css';

export const metadata = {
  title: 'Tarang 2026 — GPC Kannur | The Spectrum of Technology and Culture',
  description: 'Tarang 2026 is the annual tech and cultural fest of Government Polytechnic College Kannur. March 12 & 13 — Two days of innovation, art, competitions, and unforgettable experiences.',
  keywords: 'Tarang 2026, GPC Kannur, tech fest, cultural fest, polytechnic, hackathon, workshops, Kerala',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo.png" type="image/png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
