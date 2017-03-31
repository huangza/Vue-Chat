<template>
	<div class="full-page vc-chat"></div>
</template>

<script>
export default {
	route: {
		activate (transition) {
            this.$parent.$emit('route-pipe', true)
            transition.next()
        },
		deactivate (transition) {
            this.$parent.$emit('route-pipe', false)
            transition.next()
        },
	}
}
</script>

<style lang="stylus">
@import '../assets/css/com/mixin.styl'
.vc-chat
	background: #fff
	z_index('c', 1)
	// z_index(6)
</style>