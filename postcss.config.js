export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Manteniamo le ottimizzazioni CSS semplici per ora
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: false,
        }]
      }
    })
  },
}
