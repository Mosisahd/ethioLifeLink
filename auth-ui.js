(function () {
  function getClient() { return window.supabaseClient; }

  async function getValidSession() {
    const client = getClient();
    if (!client) return null;
    try {
      let result = await client.auth.getSession();
      if (result.error) throw result.error;
      let session = result.data && result.data.session;
      if (!session) return null;
      const expiresAt = session.expires_at ? session.expires_at * 1000 : 0;
      if (expiresAt && expiresAt - Date.now() < 60000) {
        const refreshed = await client.auth.refreshSession();
        if (!refreshed.error && refreshed.data && refreshed.data.session) session = refreshed.data.session;
      }
      return session;
    } catch (e) {
      console.warn('Session check failed:', e);
      return null;
    }
  }

  window.EthioAuth = {
    getSession: getValidSession,
    async requireLogin(returnPage) {
      const session = await getValidSession();
      if (!session) {
        const target = returnPage || (location.pathname.split('/').pop() || 'index.html');
        location.href = 'auth.html?return=' + encodeURIComponent(target);
        return null;
      }
      return session;
    },
    async logout() {
      if (getClient()) await getClient().auth.signOut();
      location.href = 'auth.html';
    }
  };

  document.addEventListener('DOMContentLoaded', async function () {
    const link = document.getElementById('auth-nav-link');
    if (!link) return;
    const session = await getValidSession();
    if (session && session.user) {
      const meta = session.user.user_metadata || {};
      link.textContent = meta.full_name ? meta.full_name.split(/\s+/)[0] : 'Account';
      link.title = 'Open your EthioLifeLink account';
      link.href = 'auth.html';
      link.classList.add('auth-user-pill');
      if (meta.profile_picture_url) {
        const img = document.createElement('img');
        img.className = 'auth-user-avatar';
        img.src = meta.profile_picture_url;
        img.alt = '';
        link.prepend(img);
      }
    } else {
      link.textContent = 'Log in';
      link.removeAttribute('title');
      link.href = 'auth.html?return=' + encodeURIComponent(location.pathname.split('/').pop() || 'index.html');
    }
  });
})();
