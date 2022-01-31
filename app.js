const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http')
const express = require('express')
const { countAllRequests } = require('./monitoring')

const PORT = parseInt(process.env.PORT || '8080', 10)

const app = express()

app.use(countAllRequests())

app.get('/', (_req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`)
})

const exporter = new OTLPTraceExporter({
  url: '<your-collector-endpoint>/v1/traces',
  headers: {},
})
