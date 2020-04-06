import Router from '@meowuu/worker-router'
import manuals from '../data/manual.json'

addEventListener('fetch', event => {
  event.respondWith(route(event.request))
})

function route (req: Request) {
  const route = new Router()
  route.get('/manual/:name', (req) => {
    const { name } = req.params
    const isSiri = !!req.querys.siri
    const result = manuals.find((item) =>
      item.name === req.params.name
    )

    if (result) {
      if (isSiri) {
        return {
          code: 0,
          data: {
            message: `你查找的${name}需要\n${
              result.materials.map(({ name, count }) => `${name} ${count}个`).join(`\n`)
            }`,
            access: result.access
          }
        }
      }
      return {
        code: 0,
        data: result
      }
    }

    return new Response(JSON.stringify({
      code: 404
    }), {
      status: 404
    })
  })

  route.default(() => {
    return {
      code: 0
    }
  })

  return route.route(req)
}