"use client";

import { useEffect, useState } from "react";

const roles = ["AI products", "machine learning systems", "full-stack apps", "useful interfaces"];

export function TypingAnimation() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting && displayText.length < role.length) {
          setDisplayText(role.substring(0, displayText.length + 1));
          return;
        }

        if (!isDeleting) {
          setIsDeleting(true);
          return;
        }

        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
          return;
        }

        setIsDeleting(false);
        setCurrentRole((currentRole + 1) % roles.length);
      },
      isDeleting ? 34 : 78
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <span className="inline-flex min-w-[13ch] items-center font-semibold text-blue-700">
      {displayText}
      <span className="ml-1 h-5 w-px bg-blue-500 animate-pulse-subtle" />
    </span>
  );
}
