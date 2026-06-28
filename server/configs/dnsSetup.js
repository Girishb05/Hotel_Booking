import dns from "node:dns";

// Some Windows/ISP DNS servers refuse SRV queries required by mongodb+srv URIs.
dns.setServers(
  process.env.DNS_SERVERS?.split(",").map((s) => s.trim()).filter(Boolean) ?? [
    "8.8.8.8",
    "8.8.4.4",
    "1.1.1.1",
  ]
);
