<template>
  <div class="nav-bar">
    <v-app-bar color="secondary" dense dark>
      <v-app-bar-nav-icon v-if="loggedIn"></v-app-bar-nav-icon>

      <v-toolbar-title>ReadyFinance</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn text @click="routeTo('/')">Home</v-btn>
        <v-btn text @click="routeTo('/about')">About</v-btn>
        <v-btn text v-if="!loggedIn" @click="routeTo('/login')">Login</v-btn>
        <v-btn text v-else>Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "nav",
  data: () => ({
    loggedIn: true,
  }),
  methods: {
    routeTo(newPath) {
      this.$router.push({ path: newPath });
    },
  },
};
</script>