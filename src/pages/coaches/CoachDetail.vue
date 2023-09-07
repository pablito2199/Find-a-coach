<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>{{ rate }}</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink" v-if="!alreadyInContactPage">
            Contact
          </base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCoach: null,
    };
  },
  props: ['id'],
  computed: {
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },
    rate() {
      return `$${this.selectedCoach.hourlyRate}/hour`;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
    contactLink() {
      return `${this.$route.path}/contact`;
    },
    alreadyInContactPage() {
      return this.$route.path.endsWith('/contact');
    },
  },
  methods: {
    loadSelectedCoach() {
      this.selectedCoach = this.$store.getters['coaches/coaches'].find(
        (coach) => coach.id === this.id
      );
    },
  },
  created() {
    this.loadSelectedCoach();
  },
};
</script>

<style scoped></style>
