export default {
  type: 'object',
  properties: {
    phone: { type: 'string' },
    email: { type: 'string' },
    quote: { type: 'object' },
  },
  required: ['quote'],
} as const;
