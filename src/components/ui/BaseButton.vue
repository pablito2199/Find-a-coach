<template>
  <div>
    <button v-if="!link" :class="mode" :type="type">
      <slot></slot>
    </button>
    <router-link v-else :to="to" :class="mode">
      <slot></slot>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
    type: {
      type: String,
      required: false,
      default: 'submit',
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #00608d;
  border: 1px solid #00608d;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #013953;
  border-color: #013953;
}

.flat {
  background-color: transparent;
  color: #00608d;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #013953;
  color: #013953;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #cdf391;
}
</style>
