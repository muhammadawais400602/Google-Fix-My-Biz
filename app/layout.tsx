import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/dm-sans';
import './globals.css';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  metadataBase: new URL(site.base),
  title: site.title,
  description: site.description,
  openGraph: { title: site.title, description: site.description, images: ['/images/ribbon-dark.png'] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fefefe' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
};

// Sets the saved theme before paint so there is no flash.
const themeScript = `try{var t=localStorage.getItem('xovra-theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
