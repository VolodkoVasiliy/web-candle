import { NavigationLinks, Subtitle, Title } from "@/components";

export default function CollectionLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavigationLinks />
            <Title />
            <Subtitle />
            {children}
        </>

    )
}