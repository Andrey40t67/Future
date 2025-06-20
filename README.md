# StreamSphere

This project contains a demo video platform with a FastAPI backend and a React frontend.

## Running the backend

The backend requires Python 3.10+.

1. Install dependencies:

```bash
pip install -r backend/requirements.txt
```

2. (Optional) create a `.env` file in `backend/` and set `MONGO_URL` and `DB_NAME`.
   If these variables are not provided the server defaults to `mongodb://localhost:27017`
   and database `streamsphere`.

3. Start the server:

```bash
uvicorn backend.server:app --reload
```

The root endpoint `/` will respond with `{"status": "ok"}` when the server is running.

## Running the frontend

```
cd frontend
npm install
npm start
```

The frontend will be available on [http://localhost:3000](http://localhost:3000).

