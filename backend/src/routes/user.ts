import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { jwt, sign, verify } from 'hono/jwt';
import {cors} from "hono/cors";
import app from "../index";

export const userRouter = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  }
}>();
// const app = new Hono();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        console.log('Request body:', body);

        if (!body.username || !body.email || !body.password) {
            c.status(400);
            return c.text("Username, email, and password are required.");
        }

        // Check if the email already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });

        if (existingUser) {
            c.status(409);
            return c.text("Email already exists.");
            
        }

        // Create the new user
        const user = await prisma.user.create({
            data: {
                name: body.username,
                email: body.email,
                password: body.password,
            },
        });

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        // Optionally set the Authorization header
        // c.res.headers.set('Authorization', token);

        return c.text(token);
    } catch (e) {
        console.error('Error during signup:', e);
        c.status(500);
        return c.text("Internal server error during signup.");
    }
});


userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        });

        if (!user) {
            c.status(403);
            return c.json({ error: "user not found" });
        }

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

        // Set Authorization header with the JWT token
        c.res.headers.set('Authorization', jwt);

        return c.text( jwt );

    } catch (error) {
        console.error("Error during sign-in:", error);
        c.status(500);
        return c.json({ error: "internal server error" });

    } finally {
        await prisma.$disconnect();
    }
});