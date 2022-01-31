const {
  ConsoleMetricExporter,
  MeterProvider,
} = require('@opentelemetry/sdk-metrics-base')

const meter = new MeterProvider({
  exporter: new ConsoleMetricExporter(),
  interval: 1000,
}).getMeter('your-meter-name')

const requestCount = meter.createCounter('requests', {
  description: 'Count all incoming requests',
})

const boundInstruments = new Map()

module.exports.countAllRequests = () => {
  return (req, _res, next) => {
    if (!boundInstruments.has(req.path)) {
      const labels = { route: req.path }

      const boundCounter = requestCount.bind(labels)

      boundInstruments.set(req.path, boundCounter)
    }

    boundInstruments.get(req.path).add(1)

    next()
  }
}
