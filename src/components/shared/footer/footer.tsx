import Link from "next/link";
import { FC } from "react";
import Container from "../container";
import { useTranslations } from "next-intl";

const Footer: FC = () => {
    const t = useTranslations("footer");
  return (
    <footer className="mx-auto bg-blue-900 flex w-full py-10 text-white">
      <Container>
        <div className="xl:grid xl:grid-cols-2 xl:gap-8">
          <div className="space-y-8 md:pr-8">
            <div className="flex items-center justify-start">
                 <Link href="/" className="text-xl font-bold">
          <svg
            width="62.012"
            height="50.682"
            viewBox="0 0 620.12 506.82"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 2"
          >
            <path
              fill="#FFFFFF"
              d="m0.31,505.49l252.58,-446.54l91.97,163.96l-8.68,13.71l-83.27,-144.33l-223.28,397.19l147.99,2.04l72.62,-136.65l61.96,98.63l112.65,-201.25l195.28,254.57l-186.61,0l-48.79,-81.28l4.82,-13.36l3.01,1.69l50.29,80.95l153.29,0l-169.27,-217.27l-115.33,209.96s-1.45,-2.27 -2.29,-3.74c-18.19,-31.83 -36.45,-63.8 -55.39,-95.19c-0.82,-1.36 0.21,-2.37 -2.94,-1.73l-62.67,118.63l-187.94,0l0,0.01z"
            />
            <path
              fill="#FFFFFF"
              d="m618.78,205.57l-4.63,-20.02c-58.22,-164.38 -291.07,-196.26 -437.61,-149.64c-77.72,24.72 -164.13,82.37 -174.91,169.66c-2.33,-0.35 -1.51,-7.02 -1.38,-8.72c5.77,-75.68 72.73,-133.31 137.78,-162.13c104.29,-46.2 238.82,-46.38 343.05,0c68.37,30.43 136.7,90.46 137.71,170.85l-0.01,0z"
            />
          </svg>
        </Link>
            </div>
            <p className="text-small text-default-200">
                {t('description')}
            </p>
            <div className="flex space-x-6">
              <Link
                className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                href="https://twitter.com/getnextui"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
                role="link"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="w-6 iconify iconify--ri"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m17.687 3.063l-4.996 5.711l-4.32-5.711H2.112l7.477 9.776l-7.086 8.099h3.034l5.469-6.25l4.78 6.25h6.102l-7.794-10.304l6.625-7.571zm-1.064 16.06L5.654 4.782h1.803l10.846 14.34z"
                  ></path>
                </svg>
              </Link>
              <Link
                className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                href="https://github.com/nextui-org"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
                role="link"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="w-6 iconify iconify--fontisto"
                  width="1.05em"
                  height="1em"
                  viewBox="0 0 25 24"
                >
                  <path
                    fill="currentColor"
                    d="M12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031a12.35 12.35 0 0 1 4.449 4.422l.031.058a12.2 12.2 0 0 1 1.654 6.166c0 5.406-3.483 10-8.327 11.658l-.087.026a.72.72 0 0 1-.642-.113l.002.001a.62.62 0 0 1-.208-.466v-.014v.001l.008-1.226q.008-1.178.008-2.154a2.84 2.84 0 0 0-.833-2.274a11 11 0 0 0 1.718-.305l-.076.017a6.5 6.5 0 0 0 1.537-.642l-.031.017a4.5 4.5 0 0 0 1.292-1.058l.006-.007a4.9 4.9 0 0 0 .84-1.645l.009-.035a7.9 7.9 0 0 0 .329-2.281l-.001-.136v.007l.001-.072a4.73 4.73 0 0 0-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479a4.25 4.25 0 0 0-.404-1.814l.011.026a2.1 2.1 0 0 0-1.31.181l.012-.005a8.6 8.6 0 0 0-1.512.726l.038-.022l-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433a9 9 0 0 0-1.272-.595l-.066-.022A2.17 2.17 0 0 0 5.837 5.1l.013-.002a4.2 4.2 0 0 0-.393 1.788c0 .531.097 1.04.275 1.509l-.01-.029a4.72 4.72 0 0 0-1.265 3.303v-.004l-.001.13c0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013a4.4 4.4 0 0 0 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012a3 3 0 0 1-.699.236l-.021.004c-.256.051-.549.08-.85.08h-.066h.003a1.9 1.9 0 0 1-1.055-.348l.006.004a2.84 2.84 0 0 1-.881-.986l-.007-.015a2.6 2.6 0 0 0-.768-.827l-.009-.006a2.3 2.3 0 0 0-.776-.38l-.016-.004l-.32-.048a1.05 1.05 0 0 0-.471.074l.007-.003q-.128.072-.08.184q.058.128.145.225l-.001-.001q.092.108.205.19l.003.002l.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024l.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007q.069.002.15.002q.392 0 .767-.062l-.027.004l.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001a.72.72 0 0 1-.645.111l.005.001C3.486 22.286.006 17.692.006 12.285c0-2.268.612-4.393 1.681-6.219l-.032.058a12.35 12.35 0 0 1 4.422-4.449l.058-.031a11.9 11.9 0 0 1 6.073-1.645h.098h-.005zm-7.64 17.666q.048-.112-.112-.192q-.16-.048-.208.032q-.048.112.112.192q.144.096.208-.032m.497.545q.112-.08-.032-.256q-.16-.144-.256-.048q-.112.08.032.256q.159.157.256.047zm.48.72q.144-.112 0-.304q-.128-.208-.272-.096q-.144.08 0 .288t.272.112m.672.673q.128-.128-.064-.304q-.192-.192-.32-.048q-.144.128.064.304q.192.192.32.044zm.913.4q.048-.176-.208-.256q-.24-.064-.304.112t.208.24q.24.097.304-.096m1.009.08q0-.208-.272-.176q-.256 0-.256.176q0 .208.272.176q.256.001.256-.175zm.929-.16q-.032-.176-.288-.144q-.256.048-.224.24t.288.128t.225-.224z"
                  ></path>
                </svg>
              </Link>
              <Link
                className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                href="https://discord.gg/9b6yyZKmH4"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
                role="link"
              >
                <span className="sr-only">Discord</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="w-6 iconify iconify--ic"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
          <div className="mt-16 sm:grid sm:grid-cols-2 sm:gap-8 lg:w-auto lg:text-right xl:mt-0">
              {/* <div>
                <h3 className="text-small font-semibold text-default-600">
                  Components
                </h3>
                <ul className="mt-4 space-y-3 sm:mt-6 md:space-y-4">
                  <li>
                    <Link
                      className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                      href="/components#charts"
                      target="_self"
                      tabIndex={0}
                      role="link"
                    >
                      Charts
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                      href="/components#application"
                      target="_self"
                      tabIndex={0}
                      role="link"
                    >
                      Application
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                      href="/components#ai"
                      target="_self"
                      tabIndex={0}
                      role="link"
                    >
                      AI
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                      href="/components#marketing"
                      target="_self"
                      tabIndex={0}
                      role="link"
                    >
                      Marketing
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                      href="/components#ecommerce"
                      target="_self"
                      tabIndex={0}
                      role="link"
                    >
                      E-commerce
                    </Link>
                  </li>
                </ul>
              </div>
            <div className="mt-10 md:mt-0">
              <div>
                <h3 className="text-small font-semibold text-default-600">
                  Resources
                </h3>
                <ul className="mt-4 space-y-3 sm:mt-6 md:space-y-4">
                  <li>
                    <Link
                      className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                      href="/documentation"
                      target="_self"
                      tabIndex={0}
                      role="link"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                      href="/pricing"
                      target="_self"
                      tabIndex={0}
                      role="link"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                      href="/support"
                      target="_self"
                      tabIndex={0}
                      role="link"
                    >
                      Support
                    </Link>
                  </li>
                  <li>
                    <div className="relative inline-flex cursor-pointer text-small text-default-400">
                      <button className="flex items-center gap-1">
                        Changelog <span id="fb-update-badge"></span>
                      </button>
                    </div>
                  </li>
                  <li>
                    <div className="relative inline-flex cursor-pointer text-small text-default-400">
                      <button data-featurebase-feedback="true">Feedback</button>
                    </div>
                  </li>
                  <li>
                    <div className="relative inline-flex cursor-pointer text-small text-default-400">
                      <Link
                        className="inline-flex items-center"
                        color="foreground"
                        target="_blank"
                        href="https://feedback.nextui.pro/roadmap"
                      >
                        <div className="relative">
                          Roadmap
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            className="absolute right-[-10px] top-0 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&amp;>path]:stroke-[2.5px]"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M6 18L18 6m0 0H9m9 0v9"
                            ></path>
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
