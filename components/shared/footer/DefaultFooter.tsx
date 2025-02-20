import Link from "next/link";

const DefaultFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold">eMarket</h2>
            <p className="text-gray-400 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, quia.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Navigation</h3>
            <ul className="mt-2 space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Contacts</h3>
            <p className="text-gray-400 mt-2">Email: example@email.com</p>
            <p className="text-gray-400">Тел: +1 (321) 123-45-67</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">🌍</a>
              <a href="#" className="text-gray-400 hover:text-white">📘</a>
              <a href="#" className="text-gray-400 hover:text-white">📸</a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-300 mt-10 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default DefaultFooter;