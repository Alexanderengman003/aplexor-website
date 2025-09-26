import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Authorization token required' }),
      };
    }

    const accessToken = authHeader.replace('Bearer ', '');

    if (event.httpMethod === 'GET') {
      // Get contacts from HubSpot
      const { limit = '20', after } = event.queryStringParameters || {};
      
      let url = `https://api.hubapi.com/crm/v3/objects/contacts?limit=${limit}&properties=firstname,lastname,email,company,phone`;
      if (after) {
        url += `&after=${after}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          statusCode: response.status,
          headers,
          body: JSON.stringify({ error: 'Failed to fetch contacts', details: data }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data),
      };
    }

    if (event.httpMethod === 'POST') {
      // Create new contact in HubSpot
      const contactData = JSON.parse(event.body || '{}');

      const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: contactData.properties
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          statusCode: response.status,
          headers,
          body: JSON.stringify({ error: 'Failed to create contact', details: data }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data),
      };
    }

    if (event.httpMethod === 'PATCH') {
      // Update existing contact in HubSpot
      const { contactId } = event.queryStringParameters || {};
      const contactData = JSON.parse(event.body || '{}');

      if (!contactId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Contact ID is required' }),
        };
      }

      const response = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: contactData.properties
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          statusCode: response.status,
          headers,
          body: JSON.stringify({ error: 'Failed to update contact', details: data }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  } catch (error) {
    console.error('HubSpot contacts error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};