<template>
  <div>
    <button @click="increment">Increment +1</button>
  </div>
</template>

<script>
import {incrementCounter} from 'vx/actions'

export default {
    vuex: {
        actions: {
            increment: incrementCounter
        }
    }
}
</script>