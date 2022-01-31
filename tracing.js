const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node')
const opentelemetry = require('@opentelemetry/sdk-node')

const sdk = new opentelemetry.NodeSDK({
  traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
  instrumentations: [getNodeAutoInstrumentations()],
})

sdk.start()
