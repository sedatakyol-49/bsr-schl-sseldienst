import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse
} from '@angular/ssr/node';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const angularApp = new AngularNodeAppEngine();
const app = express();

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false
  })
);

app.use(async (req, res, next) => {
  try {
    const response = await angularApp.handle(req);

    if (response) {
      await writeResponseToNodeResponse(response, res);
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
});

if (isMainModule(import.meta.url)) {
  const port = Number(process.env['PORT'] || 4000);

  app.listen(port, () => {
    console.log(`Node server listening on http://localhost:${port}`);
  });
}

export default createNodeRequestHandler(app);
