import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
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
  const user = await prisma.user.create({
    data: {
      username: body.username,
      password: body.password,
      name: body.name
    }
  })
  const jwt = await sign({
    id: user.id
  }, c.env.JWT_SECRET)
  return c.text(jwt)
} catch(e) {
  c.status(411);
  return c.text('Invalid')
}
})


app.post('/api/v1/user/signin', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try{
  const user = await prisma.user.findFirst({
       where: {
      username: body.username,
      password: body.password
    }
  })
  if(!user) {
    c.status(403);
    return c.json({
      message: "Incorrect creds"
    })
  }
  const jwt = await sign({
    id: user.id
  }, c.env.JWT_SECRET)
  return c.text(jwt)
} catch(e) {
  c.status(411);
  return c.text('Invalid')
}
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
