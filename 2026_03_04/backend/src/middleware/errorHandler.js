const mongo = require('../lib/mongodb');

function errorHandler(err, req, res, next) {
  void next;
  (async () => {
    try {
      const db = await mongo.connect();
      const errorLogs = db.collection('errorLogs');
      const log = {
        message: err?.message || 'Unknown error',
        name: err?.name,
        stack: err?.stack,
        method: req.method,
        url: req.originalUrl || req.url,
        body: req.body,
        params: req.params,
        query: req.query,
        ip: req.ip || req.connection?.remoteAddress,
        timestamp: new Date()
      };
      await errorLogs.insertOne(log).catch(e => {
        console.error('errorLogs insert error:', e);
      });
    } catch (e) {
      console.error('errorHandler logging failed:', e);
    } finally {
      const status = err?.status || err?.statusCode || 500;
      res.status(status).json({ error: err?.message || 'Internal Server Error' });
    }
  })();
}

module.exports = errorHandler;
