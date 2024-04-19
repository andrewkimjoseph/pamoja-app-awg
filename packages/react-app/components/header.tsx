import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function Header() {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect();

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      setHideConnectBtn(true);
      connect({ connector: injected({ target: "metaMask" }) });
    }
  }, []);


  return (
    <Disclosure as="nav" className="border-b border-white bg-pa_one">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-pa_one bg-pa_two">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                     className="block h-16 w-auto sm:block lg:block"
                    src="/logo_dark.svg"
                    priority={true}
                    width="16"
                    height="16"
                    alt="Celo Logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/"
                    className="inline-flex items-center border-b-2 border-black px-1 pt-1 text-sm font-medium text-pa_two"
                  >
                    {/* <a className="inline-flex items-center border-b-2 border-black px-1 pt-1 text-sm font-medium text-gray-900"> */}
                    Home
                  </Link>
                  <Link
                    href="/savings"
                    className="inline-flex items-center border-b-2 border-black px-1 pt-1 text-sm font-medium text-pa_two"
                  >
                    {/* <a className="inline-flex items-center border-b-2 border-black px-1 pt-1 text-sm font-medium text-gray-900"> */}
                    Savings
                    {/* </a> */}
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center border-b-2 border-black px-1 pt-1 text-sm font-medium text-pa_two"
                  >
                    {/* <a className="inline-flex items-center border-b-2 border-black px-1 pt-1 text-sm font-medium text-gray-900"> */}
                    About
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!hideConnectBtn && (
                  <ConnectButton
                    showBalance={{
                      smallScreen: true,
                      largeScreen: false,
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-4">
              <Disclosure.Button
                as="a"
                href="/"
                className="block border-l-4 border-white py-2 pl-3 pr-4 text-base font-medium text-pa_two"
              >
                Home
              </Disclosure.Button>
              {/* <Disclosure.Button
                as="a"
                href="/welcome"
                className="block border-l-4 border-white py-2 pl-3 pr-4 text-base font-medium text-pa_two"
              >
                Welcome
              </Disclosure.Button> */}
              <Disclosure.Button
                as="a"
                href="/savings"
                className="block border-l-4 border-white py-2 pl-3 pr-4 text-base font-medium text-pa_two"
              >
                Savings
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/about"
                className="block border-l-4 border-white py-2 pl-3 pr-4 text-base font-medium text-pa_two"
              >
                About
              </Disclosure.Button>
              {/* Add here your custom menu elements */}
            </div>
          </Disclosure.Panel>
        </>
      )}

      
    </Disclosure>
  );
}