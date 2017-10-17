<template>
  <div>
    <h4>Count is {{counterValue}}</h4>
  </div>
</template>

<script>
import {getCount} from 'vx/getters'

export default {
    vuex: {
        getters: {
            counterValue: getCount
        }
    }
}
</script>