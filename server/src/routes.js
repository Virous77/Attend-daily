import AuthRouter from "./routes/authRoute.js";
import UserRouter from "./routes/userRoutes.js";
import PostRouter from "./routes/postRoutes.js";
import NotificationRouter from "./routes/notificationRoute.js";
import CommentRouter from "./routes/commentsRoute.js";

const router = [
  AuthRouter,
  UserRouter,
  PostRouter,
  NotificationRouter,
  CommentRouter,
];

export default router;
