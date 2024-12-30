import { FC } from "react";
import Container from "../container";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Header: FC = () => {
    const t = useTranslations('header');
    return (
        <header className="sticky top-0 z-20 shadow-md w-full">
            <Container className="flex justify-between items-center py-4">
                <Link href="/" className="text-xl font-bold">Logo</Link>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/" className="hover:underline">{t('nav.calendar')}</Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:underline">{t('nav.about')}</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:underline">{t('nav.news')}</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:underline">{t('nav.blog')}</Link>
                        </li>
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;