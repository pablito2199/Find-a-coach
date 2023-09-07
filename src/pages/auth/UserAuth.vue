<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid" :class="{ errors: !formIsValid }">
          Please enter a valid email and password (must be at least 6 characters
          long).
        </p>
        <div class="button-container">
          <base-button style="display: inline-block">
            {{ submitButtonCaption }}
          </base-button>
          <base-button
            type="button"
            mode="flat"
            style="display: inline-block"
            @click="switchAuthMode"
          >
            {{ switchModeButtonCaption }}
          </base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === 'login' ? 'Login' : 'Signup';
    },
    switchModeButtonCaption() {
      return this.mode === 'login' ? 'Signup instead' : 'Login instead';
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(this.email) || this.password.length < 6) {
        this.formIsValid = false;
        return;
      }

      const actionPayload = {
        email: this.email,
        password: this.password,
      };

      this.isLoading = true;
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('auth/login', actionPayload);
        } else {
          await this.$store.dispatch('auth/signup', actionPayload);
        }
        this.$router.replace('/coaches');
      } catch (error) {
        this.error = error.message || 'Failed to authenticate, try later.';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    switchAuthMode() {
      this.mode = this.mode === 'login' ? 'signup' : 'login';
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #00608d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}
</style>
