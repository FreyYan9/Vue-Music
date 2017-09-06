<template>
	<div class="header">
		<div class="icon"></div>
		<h1 class="title">World Music</h1>
	</div>
</template>

<script>
	export default {
	  name: 'MHeader'
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/variable'
	@import '~common/stylus/mixin'


	.header
		position: relative
		height: 44px
		text-align: center
		color: $color-theme
		font-size: 0
		.icon
			display: inline-block
			vertical-align: top
			margin-top: 6px
			width: 30px
			height: 32px
			margin-right: 6px
			bg-image('logo')
			background-size: 30px 32px
		.title
			display: inline-block
			vertical-align: top
			line-height: 44px
			font-size: $font-size-large
		
</style>