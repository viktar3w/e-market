"use client";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import Link from "next/link";
import { useInput } from "@/hooks/useInput";
import { useDebounce } from "@/hooks/useDebounce";
import { API } from "@/lib/services/api-client";
import { Product } from "@prisma/client";
import Image from "next/image";

type HeaderSearchProps = {
  className?: string;
};
const HeaderSearch = ({ className }: HeaderSearchProps) => {
  const search = useInput("");
  const debounced = useDebounce<string>(search.bind.value);
  const [focused, setFocused] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  useClickAway(ref, () => {
    setFocused(false);
  });
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("query")) {
      search.setValue(searchParams.get("query") || "");
    }
  }, [search]);
  useEffect(() => {
    if (!!debounced || debounced.length > 2) {
      API.products
        .search(debounced)
        .then((products) => setProducts(products))
        .catch(() =>
          console.log("[ERROR] Something was wrong. Please try again"),
        );
    } else {
      setProducts([]);
    }
  }, [debounced]);
  const cleanSearch = () => {
    setFocused(false);
    setProducts([]);
    search.setValue("");
  };
  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
      )}
      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
          className,
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <Input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Find something..."
          onFocus={() => setFocused(true)}
          {...search.bind}
        />
        <div
          className={cn(
            "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            focused && "visible opacity-100 top-12",
            products.length === 0 && "hidden",
          )}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              className="flex items-center justify-start gap-3 px-3 py-2 hover:bg-primary/10 cursor-pointer"
              href={`/products/${product.id}`}
              onClick={() => cleanSearch()}
            >
              <Image
                src={product.image || "/products/default_product_img.png"}
                alt={product.name}
                width={8}
                height={8}
                className="rounded-sm h-8 w-8"
              />
              <span>{product.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeaderSearch;
