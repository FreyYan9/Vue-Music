<template>
    <div class="loading">
        <div><span></span></div>
        <div><span class="item1"></span></div>
        <div><span class="item2"></span></div>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'Loading'
}

</script>
<style scoped lang="stylus">
.loading 
    width: 60px
    height: 60px
    margin: 0 auto
    position: absolute
    left: calc(50% - 30px)
    top: calc(50% - 30px)
    -webkit-animation: load 3s linear infinite	
	div
		width: 100%
		height: 100%
		position: absolute
		&:nth-child(2)
			transform: rotate(120deg)

		&:nth-child(3)
			transform: rotate(240deg)

	span
		display: inline-block
		width: 20px
		height: 20px
		border-radius: 50%
		background: #99CC66
		position: absolute
		left: 50%
		margin-top: -10px
		margin-left: -10px
		-webkit-animation: changeBgColor 3s ease infinite
	.item1
		animation-delay: 1s
	.item2
		animation-delay: 2s

@-webkit-keyframes load
	0%
		-webkit-transform: rotate(0deg)
	33.3%
		-webkit-transform: rotate(120deg)
	66.6%
		-webkit-transform: rotate(240deg)
	100%
		-webkit-transform: rotate(360deg)
@-webkit-keyframes changeBgColor
	0%,100%
		background: #99CC66
	33.3%
		background: #FFFF66
	66.6%
		background: #FF6666
        
</style>
