import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic'; // Replace old config with this

export async function POST(request) {
  const formData = await request.formData();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  try {
    const amount = formData.get('amount');
    const email = formData.get('email');

    // Server-side validation
    if (!email.includes('@')) {
      return NextResponse.redirect(
        new URL('/donation/error?message=Invalid%20email%20address', baseUrl)
      );
    }

    if (parseFloat(amount) < 10) {
      return NextResponse.redirect(
        new URL('/donation/error?message=Minimum%20donation%20is%20R10', baseUrl)
      );
    }

    // Process payment
    const response = await fetch(`${baseUrl}/api/apiregistrationgraphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query GetPayfastCredentials { getApiByApiName(api: "payfast") { token } }`
      })
    });

    const { data, errors } = await response.json();
    if (errors) throw new Error(errors[0].message);
    if (!data?.getApiByApiName?.token) throw new Error('PayFast credentials not found');

    const decoded = jwt.decode(data.getApiByApiName.token);
    if (!decoded?.apiKey || !decoded?.apiId) throw new Error('Invalid PayFast token');

    // Prepare PayFast URL
    const params = new URLSearchParams();
    params.append('merchant_id', decoded.apiId);
    params.append('merchant_key', decoded.apiKey);
    params.append('return_url', `${baseUrl}/donation/thank-you`);
    params.append('cancel_url', `${baseUrl}/donation/cancel`);
    params.append('amount', amount);
    params.append('item_name', 'Donation');
    params.append('email_address', email);

    return NextResponse.redirect(
      `https://sandbox.payfast.co.za/eng/process?${params.toString()}`
    );

  } catch (error) {
    return NextResponse.redirect(
      new URL(`/donation/error?message=${encodeURIComponent(error.message)}`, baseUrl)
    );
  }
}