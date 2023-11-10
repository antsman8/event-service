const express = require('express');
const app = express();
const eventsRoutes = require('./routes/events');

app.use(express.json());
app.use('/api/events', eventsRoutes);

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
