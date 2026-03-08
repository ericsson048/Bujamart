# Backend FastAPI + PostgreSQL

## 1. Installation

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

## 2. Configuration

```bash
copy .env.example .env
```

Mettez à jour `DATABASE_URL` pour pointer vers votre instance PostgreSQL.

## 3. Lancer l'API

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## 4. Endpoints principaux

- `GET /health`
- `GET /api/v1/products`
- `POST /api/v1/products`
- `PATCH /api/v1/products/{product_id}`
- `DELETE /api/v1/products/{product_id}` (désactivation logique)
- `POST /api/v1/orders`
- `GET /api/v1/orders/{order_id}`
- `GET /api/v1/orders`
- `PATCH /api/v1/orders/{order_id}/status`
- `GET /api/v1/admin/customers`
- `GET /api/v1/admin/dashboard`
- `GET /api/v1/admin/settings`
- `PUT /api/v1/admin/settings`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me` (Bearer token requis)

Swagger UI: `http://localhost:8000/docs`

## Admin de test

Au démarrage, un admin est créé automatiquement si absent:

- Email: `ADMIN_EMAIL` (défaut `admin@bujamart.bi`)
- Mot de passe: `ADMIN_PASSWORD` (défaut `admin123`)

## Sécurité API

- Authentification JWT Bearer sur les endpoints admin.
- Endpoints protégés: création/édition/suppression produits, gestion commandes admin, dashboard/admin settings/customers.
