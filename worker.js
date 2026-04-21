export default {
  async fetch(request, env, ctx) {
    try {
      const accessFlag = await env.KV.get("canBeAccessed");

      if (accessFlag !== "true") {
        return new Response(getDowntimeHTML(), {
          status: 503,
          headers: {
            "content-type": "text/html;charset=UTF-8",
          },
        });
      }

      return fetch(request);

    } catch (err) {
      return new Response(getDowntimeHTML(), {
        status: 503,
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      });
    }
  }
};

// downtime page
function getDowntimeHTML() {
  return `<!DOCTYPE html>
<html>
<head>
  <title>Down for Maintenance</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .box {
      text-align: center;
      padding: 40px;
      background: #1e293b;
      border-radius: 12px;
    }
    h1 {
      margin-bottom: 10px;
    }
    p {
      opacity: 0.8;
    }
  </style>
</head>
<body>
  <div class="box">
    <h1>We'll be back soon</h1>
    <p>The site is currently down for maintenance.</p>
  </div>
</body>
</html>`;
}
