<script setup lang="ts">
    const [passenger] = defineProps["passenger"];
</script>

<template>
    <input class="passenger-name" v-model="passenger.name" />
    <input class="passenger-email" v-model="passenger.email" />
    <input class="passenger-document" v-model="passenger.document" />
    <button class="create-passenger-button" @click="createPassenger()" >create passenger</button>
    <div class="passenger-id">{{ passengerId }}</div>
</template>