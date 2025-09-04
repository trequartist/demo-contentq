# KiwiQ Demo Authentication

## Access the Demo

The demo is protected with authentication. Use the credentials below to access the platform.

### Demo URL
- Local: http://localhost:3000/demo/login
- Production: [Your deployed URL]/demo/login

## Login Credentials

### Admin Accounts

#### Primary Demo Account
- **Username:** `demo`
- **Password:** `kiwiq2024`
- **Role:** Admin
- **Full access to all features**

#### Gumloop Team Account
- **Username:** `gumloop`
- **Password:** `demo123`
- **Role:** Admin
- **Full access to all features**

### Test Account
- **Username:** `test`
- **Password:** `test123`
- **Role:** Viewer
- **Limited access (view only)**

## Features

1. **Protected Routes:** All `/demo/*` routes require authentication
2. **Session Management:** 1-hour session timeout
3. **Quick Login:** Click on any demo account in the login page for instant credentials
4. **Logout:** Available in the top-right corner of the application
5. **Session Persistence:** Stay logged in across page refreshes

## Security Notes

- Sessions expire after 1 hour of inactivity
- Credentials are stored in `/src/usableclientdata/auth/demo-credentials.json`
- For production, consider using environment variables for credentials
- This is a demo authentication system - not suitable for production use

## Customization

To add or modify credentials, edit:
`/src/usableclientdata/auth/demo-credentials.json`

To adjust session timeout or other settings, modify:
`/src/lib/auth/auth-context.tsx`
