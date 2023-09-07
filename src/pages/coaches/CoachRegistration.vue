<template>
  <div>
    <section>
      <base-dialog
        :show="!!error"
        title="An error ocurred!"
        @close="handleError"
      >
        <p>{{ error }}</p>
      </base-dialog>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <base-card v-else>
        <h2>Register as a coach now!</h2>
        <coach-form @saveData="saveData"></coach-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async saveData(data) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/registerCoach', data);
        this.$router.replace('/coaches');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped></style>
