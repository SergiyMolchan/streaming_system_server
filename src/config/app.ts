export default () => ({
    port: parseInt(process.env.PORT, 10) || 8080,
    host: '0.0.0.0'
});