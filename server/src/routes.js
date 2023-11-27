import AuthRouter from "./routes/authRoute.js";
import UserRouter from "./routes/userRoutes.js";
import PostRouter from "./routes/postRoutes.js";
import NotificationRouter from "./routes/notificationRoute.js";

const router = [AuthRouter, UserRouter, PostRouter, NotificationRouter];

export default router;
