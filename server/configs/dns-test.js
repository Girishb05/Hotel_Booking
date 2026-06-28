import "./dnsSetup.js";
import dns from "node:dns/promises";

try {
  const records = await dns.resolveSrv(
    "_mongodb._tcp.cluster0.8gd2j8t.mongodb.net"
  );

  console.log(records);
} catch (err) {
  console.error(err);
}