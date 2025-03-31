// app/api/donations/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  const formData = await request.formData();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  try {
    // Extract and validate form data
    const amount = parseFloat(formData.get('amount'));
    const email = formData.get('email');
    const processor = formData.get('processor') || 'payfast';

    if (!email || !email.includes('@')) {
      throw new Error('Please enter a valid email address');
    }

    if (isNaN(amount) || amount < 10) {
      throw new Error('Minimum donation amount is R10');
    }

    // Fetch payment processor credentials
    const gqlResponse = await fetch(`${baseUrl}/api/apiregistrationgraphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetPaymentCredentials($api: String!) {
            getApiByApiName(api: $api) {
              token
            }
          }
        `,
        variables: { api: processor }
      })
    });

    const { data, errors } = await gqlResponse.json();

    if (errors) throw new Error(errors[0].message);
    if (!data?.getApiByApiName?.token) {
      throw new Error('Payment processor configuration not found');
    }

    // Process based on payment processor type
    switch (processor) {
      case 'payfast':
        return handlePayFastPayment(data.getApiByApiName.token, amount, email, baseUrl);
      
      // Add other processors here
      // case 'stripe':
      //   return handleStripePayment(...);
      
      default:
        throw new Error('Unsupported payment processor');
    }

  } catch (error) {
    console.error('Donation error:', error);
    return NextResponse.redirect(
      new URL(`/donation/error?message=${encodeURIComponent(error.message)}`, baseUrl)
    );
  }
}

// PayFast specific handler
async function handlePayFastPayment(token, amount, email, baseUrl) {
  const decoded = jwt.decode(token);
  if (!decoded?.apiKey || !decoded?.apiId) {
    throw new Error('Invalid payment gateway configuration');
  }

  const params = new URLSearchParams({
    merchant_id: decoded.apiId,
    merchant_key: decoded.apiKey,
    return_url: `${baseUrl}/donation/thank-you`,
    cancel_url: `${baseUrl}/donation/cancel`,
    notify_url: `${baseUrl}/api/donations/webhook`,
    amount: amount.toFixed(2),
    item_name: 'Donation',
    email_address: email,
    m_payment_id: `don-${Date.now()}`
  });

  return NextResponse.redirect(
    `https://sandbox.payfast.co.za/eng/process?${params.toString()}`
  );
}

// Add other processor handlers here
// async function handleStripePayment() {...}

export const config = {
  api: {
    bodyParser: false, // Required for form data
  },
};