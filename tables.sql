CREATE TABLE cakes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    clientId INTEGER NOT NULL, 
    cakeId INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL,
    totalPrice NUMERIC(10,2) NOT NULL,
    isDelivered BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (clientId) REFERENCES clients (id),
    FOREIGN KEY (cakeId) REFERENCES cakes (id)
);


