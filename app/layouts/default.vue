<template>
  <div class="layout">
    <nav class="global-nav">
      <NuxtLink to="/" class="nav-logo">FoodSmash</NuxtLink>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <NuxtLink to="/create">Create</NuxtLink>
      <NuxtLink to="/profile">Profile</NuxtLink>
      <div class="nav-spacer"></div>
      <NuxtLink to="/create" class="btn btn-primary btn-sm">Create Combo</NuxtLink>
    </nav>

    <main class="main-content">
      <slot />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-sections">
          <div class="footer-section">
            <h4 class="footer-title">FoodSmash</h4>
            <p>The perfect pair for your plate.</p>
          </div>
          <div class="footer-section">
            <h4 class="footer-title">Community</h4>
            <p>Trending Combos</p>
            <p>Leaderboard</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 FoodSmash Inc. All rights reserved.</p>
          <div class="footer-links">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.nav-logo {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary) !important;
  margin-right: var(--spacing-xl);
}

.nav-spacer {
  flex: 1;
}

.btn-sm {
  padding: 8px 24px;
  font-size: 13px;
}

.footer-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.footer-title {
  color: var(--text-base);
  margin-bottom: var(--spacing-md);
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.1em;
}

.footer-section p {
  margin: var(--spacing-xxs) 0;
  cursor: pointer;
}

.footer-section p:hover {
  color: var(--text-base);
}

.footer-bottom {
  border-top: 1px solid var(--bg-surface);
  padding-top: var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.footer-links span {
  margin-left: var(--spacing-md);
  cursor: pointer;
}

.footer-links span:hover {
  color: var(--text-base);
}
</style>
