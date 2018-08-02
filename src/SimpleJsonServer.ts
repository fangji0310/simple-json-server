import * as express from 'express'
import router from './SimpleJsonRouter'

class SimpleJsonServer {
  public express

  constructor() {
    this.express = this.createExpress()
  }
  private createExpress(): express.Express {
    var app = express();
    app.use(express.urlencoded({
      extended: true
    }))
    app.use(express.json())
    app.use(router);
    app.use(function(req, res, next) {
      res.status(404)
      res.json({})
    })
    return app
  }
}

export default new SimpleJsonServer().express
