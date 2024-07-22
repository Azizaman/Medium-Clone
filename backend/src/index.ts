import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'
const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

app.use(
    '/*',
    cors({
        origin: ' http://localhost:5173',
        credentials: true,
    })
);
// Define your routes
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

// Root route
app.get('/', async (c) => {
    return c.text('Server is working');
});

export default app;

