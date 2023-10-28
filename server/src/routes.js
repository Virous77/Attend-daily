import AuthRouter from "./routes/authRoute.js";
import UserRouter from "./routes/userRoutes.js";
import PostRouter from "./routes/postRoutes.js";

const router = [AuthRouter, UserRouter, PostRouter];

export default router;
