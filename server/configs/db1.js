import "./dnsSetup.js";
import dns from "node:dns/promises";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const srvHost = "_mongodb._tcp.cluster0.8gd2j8t.mongodb.net";

try {
  const records = await dns.resolveSrv(srvHost);
  console.log("✅ SRV records resolved:", records.length);
} catch (err) { 
  console.error("❌ SRV lookup failed:", err.message);
  process.exit(1);
}

const client = new MongoClient(process.env.MONGO_DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  console.log("✅ Connected");

  const ping = await client.db("admin").command({ ping: 1 });
  console.log("🏓 Ping successful:", ping);
} catch (err) {
  console.error("❌ Connection failed:", err.message);
  process.exit(1);
} finally {
  await client.close();
}
