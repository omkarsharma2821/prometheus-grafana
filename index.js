const express = require('express');
const ciient = require('prom-client'); // reqquired for metrics collection
const {doSomeHeavyTask} = require('./heavyTask');

const app = express();
const PORT = process.env.PORT || 8000;

const collectDefaultMetrics = ciient.collectDefaultMetrics;
collectDefaultMetrics({ register: ciient.register }); // Start collecting default metrics (CPU, memory, etc.)

app.get('/', (req, res) => {
  res.send({ message: 'Hello  from the server!' });
});

app.get('/heavytask', async (req, res) => {
    try {
        const timeTaken = await doSomeHeavyTask();
        console.log(`Heavy task completed in ${timeTaken} ms`);
        return res.send({ message: 'Heavy task completed!', timeTaken });
    } catch (error) {
        return res.status(500).send({ message: 'An error occurred while performing the heavy task.', error: error.message });
    }
});

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', ciient.register.contentType);
  const metrics = await ciient.register.metrics();
  res.send(metrics);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});