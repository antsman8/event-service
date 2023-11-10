const db = require('../db');

exports.createEvent = async (req, res) => {
    const { type, payload } = req.body;

    if (!type || !payload || !payload.email || payload.id === undefined) {
        return res
            .status(400)
            .json({ message: 'Missing event data in request body' });
    }

    try {
        const result = await db.query(
            'INSERT INTO action_history (type, user_id, user_email) VALUES ($1, $2, $3) RETURNING *',
            [type, payload.id, payload.email]
        );

        res.status(201).json({
            message: 'Event logged',
            event: result.rows[0],
        });
    } catch (err) {
        console.error('Error logging event:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getEventHistory = async (req, res) => {
    const userId = req.query.id; // Необязательный параметр
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        let query = 'SELECT * FROM action_history';
        let queryParams = [];

        if (userId) {
            query += ' WHERE user_id = $1';
            queryParams.push(userId);
        }

        query += ' ORDER BY timestamp DESC LIMIT $2 OFFSET $3';
        queryParams.push(limit, offset);

        const result = await db.query(query, queryParams);

        res.status(200).json({
            message: 'Event history retrieved',
            events: result.rows,
            page,
            limit,
            totalEvents: result.rowCount,
        });
    } catch (err) {
        console.error('Error retrieving event history:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
