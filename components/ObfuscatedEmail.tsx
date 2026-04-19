"use client";

import { useEffect, useState } from "react";

// Obfuscation: the email is assembled on the client, so bots scraping
// static HTML see only the fallback "email" text. Not bulletproof against
// headless browsers, but cuts the long tail of lazy harvesters.
const USER = "vmaher2325";
const DOMAIN = "gmail.com";

type Props = {
  className?: string;
};

export default function ObfuscatedEmail({ className }: Props) {
  const [ready, setReady] = useState(false);

  // Intentional: flip from server-rendered fallback to the real address
  // only after hydration. The "setState in effect on mount" pattern is the
  // canonical way to avoid hydration mismatches for client-only content.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!ready) {
    return <span className={className}>email</span>;
  }

  const address = `${USER}@${DOMAIN}`;
  return (
    <a
      href={`mailto:${address}`}
      className={className}
      rel="noopener noreferrer"
    >
      {address}
    </a>
  );
}
