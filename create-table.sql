CREATE TABLE IF NOT EXISTS action_history (
    id SERIAL PRIMARY KEY,                
    type VARCHAR(255) NOT NULL,           
    user_email VARCHAR(255) NOT NULL,     
    timestamp TIMESTAMP NOT NULL,         
    user_id INTEGER NOT NULL              
);