<template>
    <div class="container">
        <div class="row">
            <div class="inline-container">
                <input type="text" placeholder="Nueva tarea...">
                <template v-if="optionsCheckBox" v-for="checkBox in optionsCheckBox" :key="checkBox.id">
                    <label :for="checkBox.name">{{ checkBox.name }}</label>
                    <input type="checkbox" :value="checkBox.id" v-model="selectedCheckBox">
                </template>
                <button type="button">Botón</button>
            </div>
        </div>
        <div class="row">
            <div class="container_table">
                <table>
                    <thead>
                        <tr>
                            <th>Tarea</th>
                            <th class="border_left">Categorias</th>
                            <th class="border_left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="tasks" v-for="(task, index) in tasks" :key="task.id">
                            <tr class="light_grey" v-if="index % 2 === 0">
                                <td>
                                    <p>{{ task.name }}</p>
                                </td>
                                <td class="border_left tag_container"
                                    :class="`tag_container_grid-${task.categories.length}`">
                                    <template v-if="task.categories" v-for="category in task.categories" :key="category.id">
                                        <span class="tag" v-if="category.visible">
                                            {{ category.name }}
                                        </span>
                                    </template>
                                </td>
                                <td class="border_left button_container">
                                    <span class="red hand" @click="deleteTask(index)">X</span>
                                </td>
                            </tr>
                            <tr class="white" v-else>
                                <td>
                                    <p>{{ task.name }}</p>
                                </td>
                                <td class="border_left tag_container"
                                    :class="`tag_container_grid-${task.categories.length}`">
                                    <template v-if="task.categories" v-for="category in task.categories" :key="category.id">
                                        <span class="tag" v-if="category.visible">
                                            {{ category.name }}
                                        </span>
                                    </template>
                                </td>
                                <td class="border_left button_container">
                                    <span class="red hand" @click="deleteTask(index)">X</span>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Category, Task } from '@/utils/types'
import { config } from '@/config/config'

const optionsCheckBox = ref<Category[]>([])
const selectedCheckBox = ref<number[]>([])
const tasks = ref<Task[]>([]);

onMounted(() => {
    fetch(`${config.URL_BASE_BACKEND}/categories`, {
        method: 'GET'
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Error en la llamada a la API');
        }
        return response.json();
    }).then(({ data }) => {
        optionsCheckBox.value = data
    })
    fetch(`${config.URL_BASE_BACKEND}/task`, {
        method: 'GET'
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Error en la llamada a la API');
        }
        return response.json();
    }).then(({ data }) => {
        tasks.value = data
    })
})

const deleteTask = (index: number) => {
    fetch(`${config.URL_BASE_BACKEND}/task/${tasks.value[index].id}`, {
        method: 'DELETE'
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Error en la llamada a la API');
        }
        return response.json();
    }).then(() => {
        tasks.value = tasks.value.filter((element: Task) => element.id !== tasks.value[index].id)
    })
}
</script>
<style>
.container {
    display: grid;
    grid-template-columns: 10% 75% 15%;
    grid-column-gap: 0px;
    justify-items: start;
    text-align: left;
}

table {
    width: 100%;
    border: 1px solid black;
}

tr {
    display: grid;
    grid-template-columns: 50% 25% 25%;
    grid-column-gap: 0px;
    justify-items: start;
    text-align: left;
}

th:nth-of-type(1) {
    grid-column-start: 1;
    grid-column-end: 1;
    width: 100%;
}

th:nth-of-type(2) {
    grid-column-start: 2;
    grid-column-end: 2;
    width: 100%;
}

th:nth-of-type(3) {
    grid-column-start: 3;
    grid-column-end: 3;
    width: 100%;
}

.row {
    grid-column-start: 2;
    grid-column-end: 3;
    width: 100%;
}

th {
    background-color: grey;
}

.border_left {
    border-left: 1px solid black;
}

.light_grey {
    background-color: rgba(128, 128, 128, 0.3);
}

.white {
    background-color: white;
}

.red {
    color: red;
}

.tag_container {
    display: grid;
    gap: 10px;
    justify-content: center;
    place-items: center stretch;
    width: 100%;
}

.tag_container_grid-1 {
    grid-template-columns: 50%;
}

.tag_container_grid-2 {
    grid-template-columns: repeat(2, 45%);
}

.tag_container_grid-3 {
    grid-template-columns: repeat(3, 30%);
}

.tag {
    background-color: grey;
    border: 1px solid black;
    text-align: center;
}

.button_container {
    display: grid;
    gap: 10px;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.hand {
    cursor: pointer;
}
</style>