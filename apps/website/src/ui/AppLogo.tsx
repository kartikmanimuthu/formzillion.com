/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import clsx from "clsx";

export default function AppLogo({ href = "/", className }: {
  href?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={clsx("flex", className)}>
      <img
        src={"/logos/fz_logo_full.svg"}
        alt="Formzillion Logo"
        className="w-auto h-8 object-contain"
      />
    </Link>
  );
}
