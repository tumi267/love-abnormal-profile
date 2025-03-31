// app/donations/DonationForm.jsx
'use client';

import { useFormState, useFormStatus } from 'react-dom';

export default function DonationForm({ handleSubmit }) {
  const [state, formAction] = useFormState(handleSubmit, null);
  const { pending } = useFormStatus();

  return (
    <form action={formAction}>
      <div className="form-group">
        <label htmlFor="amount">Donation Amount (ZAR):</label>
        <input
          type="number"
          id="amount"
          name="amount"
          min="10"
          defaultValue="100"
          required
          className="input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Your Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
          className="input"
        />
      </div>

      <button 
        type="submit" 
        className="submitButton" 
        disabled={pending}
        aria-disabled={pending}
      >
        {pending ? 'Processing...' : 'Donate'}
      </button>

      {state?.error && (
        <div className="errorMessage">{state.error}</div>
      )}

      <p className="note">
        You will be redirected to PayFast to complete your donation securely.
      </p>
    </form>
  );
}