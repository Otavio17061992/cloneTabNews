import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";

export default function Layout({ children, title, description }) {
    const siteTitle = title ? `${title} | João.dev` : "João.dev — Portfólio & Comunidade";
    const siteDescription =
        description ||
        "Portfólio profissional e comunidade dev. Projetos, artigos de TI e contato com João Mesquita, desenvolvedor full-stack.";

    return (
        <>
            <Head>
                <title>{siteTitle}</title>
                <meta name="description" content={siteDescription} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content={siteDescription} />
                <meta name="theme-color" content="#6366f1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main style={{ paddingTop: "68px", minHeight: "100vh" }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
