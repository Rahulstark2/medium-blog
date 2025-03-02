import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  }
}>()

app.use('/api/v1/blog/*', async(c,next) => {
  const header = c.req.header("authorization") || "";

  const token = header.split(" ")[1]

  // @ts-ignore
  const response = await verify(header, c.env.JWT_SECRET)

  if(response.id) {
    next()
  } else {
    c.status(403)
    return c.json({error: "unauthorized"})
  }
})

app.post('/api/v1/user/signup', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try{
  await prisma.user.create({
    data: {
      username: body.username,
      password: body.password,
      name: body.name
    }
  })

  return c.text('Signed up')
} catch(e) {
  c.status(411);
  return c.text('Invalid')
}

//   //@ts-ignore
//   const token = await sign({ id: user.id }, c.env.JWT_SECRET)
//   return c.json({
//     jwt: token
// })
})


app.post('/api/v1/user/signin', async (c) => {
	const prisma = new PrismaClient({
    //@ts-ignore
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const user = await prisma.user.findUnique({
		where: {
			username: body.username,
      password: body.password
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

   //@ts-ignore
	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ jwt });
})


app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

export default app
