export const AGENTS = {
  1: {
    name: "File Scanner",
    blurb: "Checks the real file type, hash, antivirus and rules.",
    icon: "M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z",
    steps: [
      "Checking real file type",
      "Computing SHA-256 hash",
      "Running antivirus engine",
      "Applying YARA rules",
      "Extracting macros and links",
    ],
  },
  2: {
    name: "Reporter",
    blurb: "Turns the findings into a clear report.",
    icon: "M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5zM14 3v5h5M9 13h6M9 17h6",
    steps: ["Collecting evidence", "Calculating risk score", "Writing summary", "Building report"],
  },
  3: {
    name: "Sanitizer",
    blurb: "Removes risky parts and rebuilds a safe copy.",
    icon: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18",
    steps: [
      "Finding risky elements",
      "Removing macros and scripts",
      "Rebuilding the file",
      "Re-scanning the safe copy",
    ],
  },
  4: {
    name: "Website Scanner",
    blurb: "Checks the link, redirects, certificate and page content.",
    icon: "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18",
    steps: [
      "Validating the link",
      "Resolving DNS safely",
      "Following redirects",
      "Checking the certificate",
      "Checking reputation lists",
      "Reading page content",
    ],
  },
};

// Which agents run for each scan type, in order
export const getPlan = (scan) => (scan.type === "url" ? [4, 2] : [1, 2, 3]);

export function getSkipReason(scan) {
  if (scan.verdict === "clean") return "Not needed. No risky content was found.";
  if (scan.verdict === "malicious") return "Skipped. Malicious files are quarantined, not cleaned.";
  return "This file type cannot be cleaned. It was quarantined for review.";
}