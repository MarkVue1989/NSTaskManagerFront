<template>
    <header>
        <h1>Gestor de tareas</h1>
    </header>
</template>
<script setup lang="ts">
</script>
<style>
header {
    display: grid;
    grid-template-columns: 10% 75% 15%;
    grid-column-gap: 0px;
    justify-items: start;
    text-align: left;
}

h1 {
    grid-column-start: 2;
    grid-column-end: 3;
    width: 100%;
    border-bottom: 1px solid black;
}
</style>