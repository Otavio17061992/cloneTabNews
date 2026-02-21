import Layout from "../components/Layout";
import ProgressBar from "../components/ProgressBar";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
    return (
        <Layout
            title={pageProps.title}
            description={pageProps.description}
        >
            <ProgressBar />
            <Component {...pageProps} />
        </Layout>
    );
}
