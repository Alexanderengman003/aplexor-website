import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const { firstname, lastname, email, company, message } = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!firstname || !lastname || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: firstname, lastname, email' 
        })
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Invalid email format' 
        })
      };
    }

    // Get HubSpot API key from environment
    const hubspotApiKey = process.env.HUBSPOT_PRIVATE_APP_KEY;
    if (!hubspotApiKey) {
      console.error('HubSpot API key not found in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Server configuration error' 
        })
      };
    }

    // Prepare HubSpot contact data
    const contactData = {
      properties: {
        firstname,
        lastname,
        email,
        ...(company && { company }),
        ...(message && { message })
      }
    };

    // Make request to HubSpot API
    const hubspotResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hubspotApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });

    if (!hubspotResponse.ok) {
      const errorData = await hubspotResponse.text();
      console.error('HubSpot API Error:', errorData);
      
      // Handle specific HubSpot errors
      if (hubspotResponse.status === 409) {
        // Contact already exists - update instead
        try {
          const updateResponse = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${hubspotApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
          });
          
          if (updateResponse.ok) {
            return {
              statusCode: 200,
              headers,
              body: JSON.stringify({ 
                success: true, 
                message: 'Contact updated in HubSpot' 
              })
            };
          }
        } catch (updateError) {
          console.error('Failed to update existing contact:', updateError);
        }
      }
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Failed to create contact in HubSpot' 
        })
      };
    }

    const result = await hubspotResponse.json();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Contact successfully added to HubSpot',
        contactId: result.id 
      })
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: 'Internal server error' 
      })
    };
  }
};

export { handler };