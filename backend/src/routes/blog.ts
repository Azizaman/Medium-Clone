import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: String;
    }
}>();

blogRouter.use('/*',async (c, next) => {
    const token = c.req.header('Authorization');
	if (!token) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	// const token = jwt.split(' ')[1];
	try{
    const user = await verify(token, c.env.JWT_SECRET);
	if (!user) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
  //@ts-ignore
	c.set('userId', user.id);
	await next()
  }
  catch(e){
    c.status(401);
		return c.json({ error: "Not logged in " });
  }
});

blogRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const blog = await prisma.blog.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: Number(userId)
		}
	});
	return c.json({
		id: blog.id
	});
})

blogRouter.put('/', async (c) => {
	// const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	await prisma.blog.update({
		where: {
			id: body.id
			
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});



// Todo: add pagination
blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())
	const blogs = await prisma.blog.findMany({
		select: {
			content: true,
			title: true,
			id: true,
			author: {
				select: {
					name: true
				}
			}
		}
	});

	return c.json({
		blogs
	})
})


blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');

	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
  try{
    const blog = await prisma.blog.findFirst({
      where: {
        id:Number(id)
      },
		select:{
		  id:true,
		  title:true,
			content:true,
			author:{
			  select:{
				  name:true
			  }
			}
		}
    });
  
    return c.json(blog);

  }
  catch(e){
    c.status(404);
    return c.json({
      message:"Error while fetching the blog posts"
    })
    
  }
})
