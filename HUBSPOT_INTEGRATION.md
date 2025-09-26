# HubSpot CRM Integration Guide

This project includes a complete HubSpot CRM integration that allows you to:
- View HubSpot contacts on your website
- Create new contacts directly from your website
- Authenticate using OAuth 2.0

## Setup Instructions

### 1. HubSpot Configuration

The following credentials are already configured as secrets:
- **Client ID**: `a227d140-f27a-4cc1-aa94-c4e21c62c01b`
- **Client Secret**: `2957ca35-95ed-4d7d-8ddc-be322c68a6a5`

### 2. Environment Variables

The following environment variables are automatically set from your Lovable secrets:
- `HUBSPOT_CLIENT_ID` - Your HubSpot app client ID
- `HUBSPOT_CLIENT_SECRET` - Your HubSpot app client secret

### 3. HubSpot App Settings

In your HubSpot developer account, make sure your app has:
- **Redirect URI**: `https://your-deployed-site.netlify.app/.netlify/functions/hubspot-callback`
- **Scopes**: 
  - `crm.objects.contacts.read` (to read contacts)
  - `crm.objects.contacts.write` (to create/update contacts)

## How to Use

### 1. Access the Portal
Navigate to `/portal` on your website.

### 2. Connect to HubSpot
1. Click the "Connect to HubSpot CRM" button
2. You'll be redirected to HubSpot to authorize the connection
3. After authorization, you'll be redirected back to your portal

### 3. View Contacts
Once connected, you'll see:
- A list of all your HubSpot contacts
- Contact details (name, email, company, phone)
- Pagination support for large contact lists

### 4. Create New Contacts
1. Click the "Add Contact" button
2. Fill in the contact details
3. Click "Create Contact" to add them to your HubSpot CRM

### 5. Disconnect
Click the "Disconnect" button to logout from HubSpot.

## API Endpoints

The integration includes these serverless functions:

### `/hubspot-auth` (GET)
Redirects to HubSpot OAuth authorization URL.

### `/hubspot-auth` (POST)
Exchanges authorization code for access token.
- **Body**: `{ "code": "authorization_code" }`
- **Returns**: `{ "success": true, "access_token": "...", "refresh_token": "...", "expires_in": 3600 }`

### `/hubspot-contacts` (GET)
Retrieves contacts from HubSpot CRM.
- **Headers**: `Authorization: Bearer ACCESS_TOKEN`
- **Query Params**: `limit` (optional, default 20), `after` (optional, for pagination)
- **Returns**: Contact list with pagination info

### `/hubspot-contacts` (POST)
Creates a new contact in HubSpot CRM.
- **Headers**: `Authorization: Bearer ACCESS_TOKEN`
- **Body**: `{ "properties": { "firstname": "John", "lastname": "Doe", "email": "john@example.com", ... } }`

### `/hubspot-contacts` (PATCH)
Updates an existing contact in HubSpot CRM.
- **Headers**: `Authorization: Bearer ACCESS_TOKEN`
- **Query Params**: `contactId` (required)
- **Body**: `{ "properties": { ... } }`

## Components

### `HubSpotContactsList`
React component that displays and manages HubSpot contacts.
- Fetches contacts from API
- Displays contact cards with details
- Provides form to create new contacts
- Handles loading states and errors

## Security Features

- OAuth 2.0 authentication with HubSpot
- Secure token handling
- CORS configuration for API endpoints
- Input validation and error handling
- No sensitive data stored in localStorage

## Deployment Notes

1. Deploy to Netlify or similar platform
2. Update HubSpot app redirect URI to match your deployed domain
3. Environment variables are automatically configured from Lovable secrets
4. Functions will be deployed to `/.netlify/functions/`

## Error Handling

The integration includes comprehensive error handling for:
- OAuth authorization failures
- API rate limits
- Network errors
- Invalid tokens
- Missing permissions

All errors are displayed via toast notifications to provide user feedback.