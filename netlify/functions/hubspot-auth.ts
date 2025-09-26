import { Handler } from '@netlify/functions';

const HUBSPOT_CLIENT_ID = process.env.HUBSPOT_CLIENT_ID;
const HUBSPOT_CLIENT_SECRET = process.env.HUBSPOT_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.URL || 'http://localhost:3000'}/.netlify/functions/hubspot-callback`;

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    if (event.httpMethod === 'GET') {
      // Step 1: Redirect to HubSpot OAuth
      const authUrl = `https://app.hubspot.com/oauth/authorize?client_id=${HUBSPOT_CLIENT_ID}&scope=crm.objects.contacts.read%20crm.objects.contacts.write&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;
      
      return {
        statusCode: 302,
        headers: {
          ...headers,
          Location: authUrl,
        },
      };
    }

    if (event.httpMethod === 'POST') {
      // Step 2: Exchange code for access token
      const { code } = JSON.parse(event.body || '{}');
      
      if (!code) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Authorization code is required' }),
        };
      }

      const tokenResponse = await fetch('https://api.hubapi.com/oauth/v1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: HUBSPOT_CLIENT_ID!,
          client_secret: HUBSPOT_CLIENT_SECRET!,
          redirect_uri: REDIRECT_URI,
          code: code,
        }),
      });

      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Failed to exchange code for token', details: tokenData }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_in: tokenData.expires_in,
        }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  } catch (error) {
    console.error('HubSpot auth error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};