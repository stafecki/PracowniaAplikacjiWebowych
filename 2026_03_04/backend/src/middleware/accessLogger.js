const mongo = require('../lib/mongodb');

function accessLogger(req, res, next) {
  const start = Date.now();
  const CRUD = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!CRUD.includes(req.method)) return next();
  res.on('finish', async () => {
    try {
      const db = await mongo.connect();
      const accessLogs = db.collection('accessLogs');
      const log = {
        method: req.method,
        url: req.originalUrl || req.url,
        status: res.statusCode,
        responseTimeMs: Date.now() - start,
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query,
        ip: req.ip || req.connection?.remoteAddress,
        timestamp: new Date()
      };
      await accessLogs.insertOne(log).catch(e => {
        console.error('accessLogs insert error:', e);
      });
    } catch (e) {
      console.error('accessLogger failed:', e);
    }
  });

  next();
}

module.exports = accessLogger;
