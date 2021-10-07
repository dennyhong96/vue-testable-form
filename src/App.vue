<template>
  <form @submit="handleSubmit">
    <div>
      <label for="name">Parient Name</label>
      <input id="name" type="text" name="name" v-model="name" />
    </div>
    <div
      v-if="form.name.valid === false"
      :style="{ color: 'red' }"
      data-test="name-error"
    >
      {{ form.name.message }}
    </div>

    <div>
      <label for="weight">Parient Weight</label>
      <input
        id="weight"
        type="number"
        name="weight"
        v-model.number="weight.value"
      />

      <select v-model="weight.units">
        <option value="kg">kg</option>
        <option value="lb">lb</option>
      </select>
    </div>
    <div
      v-if="form.weight.valid === false"
      :style="{ color: 'red' }"
      data-test="weight-error"
    >
      {{ form.weight.message }}
    </div>

    <button :disabled="!formValid" type="submit">Submit</button>
  </form>

  <div>
    <pre>{{ patient }}</pre>
  </div>

  <div>
    <pre>{{ form }}</pre>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import { Patient, patientForm, isFormValid } from "./validations";

export default defineComponent({
  name: "App",
  components: {},

  setup() {
    const patient = reactive<Patient>({
      name: "",
      weight: {
        value: 0,
        units: "lb",
      },
    });

    const form = computed(() => patientForm(patient));

    const formValid = computed(() => isFormValid(form.value));

    const handleSubmit = (evt: Event) => {
      evt.preventDefault();
      console.log("Submitted.");
    };

    return {
      patient,
      ...toRefs(patient),
      form,
      formValid,

      handleSubmit,
    };
  },
});
</script>
