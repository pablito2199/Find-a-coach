<template>
  <header>
    <nav>
      <ul>
        <a href="https://github.com/pablito2199/Find-a-coach" target="_blank">
          <v-icon
            name="bi-github"
            title="GitHub - pablito2199/Find-a-coach"
            scale="2"
            fill="#cdf391"
            animation="wrench"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/pablo-tarr%C3%ADo-otero-806b52204/"
          target="_blank"
        >
          <v-icon
            name="bi-linkedin"
            title="LinkedIn - Pablo Tarrío Otero"
            scale="2"
            fill="#cdf391"
            animation="wrench"
            style="padding: 0"
          />
        </a>
        <h1>
          <router-link :to="'/'" replace>Find a coach</router-link>
        </h1>
      </ul>
      <ul>
        <li>
          <router-link :to="'/coaches'" replace>All coaches</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link :to="'/requests'" replace>Requests</router-link>
        </li>
        <li v-else>
          <router-link :to="'/auth'" replace>Login</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isAuthenticated'];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #017eb8;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #cdf391;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #cdf391;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
