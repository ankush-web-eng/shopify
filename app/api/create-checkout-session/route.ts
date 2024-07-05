import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
  const { amount } = await request.json();
  console.log(amount)

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // add one more payment option
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Total Price',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success`,
      cancel_url: `${request.headers.get('origin')}/cancel`,
    });

    return NextResponse.json({ id: session.id }, {status: 201});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
