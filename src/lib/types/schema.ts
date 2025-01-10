export type Schema = {
    title: string;
    description: string;
    robots: {
        index: boolean;
        follow: boolean;
    },
    og_image: Array<{
        width: number;
        height: number;
        url: string;
        type: string;
    }>;
    schema: {
        "@context": string;
        "@graph": Array<{
            "@type": string;
            "@id": string;
            name: string;
            url: string;
            thumbnailUrl: string;
            datePublished: string;
            dateModified: string;
            description: string;
            inLanguage: string;
        }>;
    }
}