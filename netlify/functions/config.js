exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60'
    },
    body: JSON.stringify({
      url: process.env.SUPABASE_URL || '',
      key: process.env.SUPABASE_ANON_KEY || ''
    })
  };
};

