import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  try {
    const { code, error } = event.queryStringParameters || {};

    if (error) {
      // OAuth error - redirect back to portal with error
      return {
        statusCode: 302,
        headers: {
          Location: `/portal?error=${encodeURIComponent(error)}`,
        },
      };
    }

    if (code) {
      // Success - redirect back to portal with auth code
      return {
        statusCode: 302,
        headers: {
          Location: `/portal?code=${encodeURIComponent(code)}`,
        },
      };
    }

    return {
      statusCode: 302,
      headers: {
        Location: '/portal?error=no_code',
      },
    };
  } catch (error) {
    console.error('HubSpot callback error:', error);
    return {
      statusCode: 302,
      headers: {
        Location: '/portal?error=server_error',
      },
    };
  }
};