import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

const DefaultFooter = () => {
  const $t = useTranslation();
  return (
    <footer className="bg-gray-900 text-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold">{$t("eMarket")}</h2>
            <p className="text-gray-400 mt-2">{$t("eMarket")}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">{$t("Navigation")}</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  {$t("Home")}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  {$t("About")}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  {$t("Contact Us")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">{$t("Contacts")}</h3>
            <p className="text-gray-400 mt-2">
              {$t("Email: {1}", { ["1"]: "example@email.com" })}
            </p>
            <p className="text-gray-400">
              {$t("Tel: {1}", { ["1"]: "+1 (321) 123-45-67" })}
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                🌍
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                📸
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-300 mt-10 border-t border-gray-700 pt-4">
          ©{" "}
          {$t("{1} All rights reserved", { ["1"]: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
};

export default DefaultFooter;
