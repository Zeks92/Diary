export default {
  methods: {
    $_date_sortDescendingly: (a, b) => new Date(b.date) - new Date(a.date),
    $_date_format: (date) => `${date.substr(8, 2)}/${date.substr(5, 2)}/${date.substr(0, 4)}`,
  }
}
