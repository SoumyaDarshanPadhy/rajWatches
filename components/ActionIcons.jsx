"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ActionIcons() {
  const router = useRouter();
  return (
    <div className="flex gap-5 justify-end mb-6">
      {/* Heart */}
      <button aria-label="Favourite" onClick={() => alert("Favourite pressed!")}>
        <Image src="/icons/heart.svg" alt="Favourite" width={28} height={28} />
      </button>
      {/* Profile */}
      <button aria-label="Profile" onClick={() => router.push("/profile")}>
        <Image src="/icons/person.svg" alt="Profile" width={28} height={28} />
      </button>
      {/* Cart */}
      <button aria-label="Cart" onClick={() => router.push("/checkout")}>
        <Image src="/icons/cart.svg" alt="Cart" width={28} height={28} />
      </button>
    </div>
  );
}
