<template>
  <div class="loginForm">
    <br />
    <br />

    <v-card class="mx-auto" min-width="30%" max-width="40%">
      <br />
      <h1>Login</h1>
      <v-form v-model="valid">
        <v-container>
          <v-col cols="12">
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="passRules"
              :type="showPass ? 'text' : 'password'"
              name="input-10-2"
              label="Visible"
              hint="At least 8 characters"
              value="wqfasds"
              class="input-group--focused"
              @click:append="showPass = !showPass"
            ></v-text-field>
          </v-col>
          <div class="submit">
            <v-btn large color="secondary">Submit</v-btn>
          </div>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    password: "",
    userPassword: "",
    showPass: false,
    passRules: [
      v => !!v || "Password is required",
      v => v.length >= 8 || "Password must be at least 8 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  })
};
</script>

<style>
</style>