import { storage } from "./storage";

async function initializeDatabase() {
  try {
    const existingAdmin = await storage.getAdminUser("admin");
    if (!existingAdmin) {
      await storage.createAdminUser({
        username: "admin",
        password: "kilbil123456",
      });
      console.log("✅ Database initialized with admin user");
      console.log("📝 Admin Username: admin");
      console.log("🔐 Admin Password: kilbil123456");
    } else {
      console.log("✅ Admin user already exists");
    }
    process.exit(0);
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    process.exit(1);
  }
}

initializeDatabase();
